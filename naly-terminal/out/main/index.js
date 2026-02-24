"use strict";
const electron = require("electron");
const path = require("path");
const utils = require("@electron-toolkit/utils");
const child_process = require("child_process");
const os = require("os");
const fs = require("fs");
const chokidar = require("chokidar");
let activeProcess = null;
function findClaudeCli() {
  const candidates = [
    "/usr/local/bin/claude",
    "/opt/homebrew/bin/claude",
    path.join(os.homedir(), ".npm-global/bin/claude"),
    path.join(os.homedir(), ".local/bin/claude"),
    "claude"
    // fallback to PATH
  ];
  return candidates[candidates.length - 1];
}
function spawnClaude(win, options) {
  if (activeProcess) {
    activeProcess.kill("SIGTERM");
    activeProcess = null;
  }
  const args = [
    "-p",
    "--output-format",
    "stream-json",
    "--verbose"
  ];
  if (options.sessionId) {
    args.push("--resume", options.sessionId);
  }
  if (options.permissionMode) {
    args.push("--permission-mode", options.permissionMode);
  }
  args.push(options.prompt);
  const claudePath = findClaudeCli();
  activeProcess = child_process.spawn(claudePath, args, {
    cwd: options.workingDirectory || process.cwd(),
    env: {
      ...process.env,
      FORCE_COLOR: "0"
      // Disable ANSI colors in JSON output
    },
    shell: true
  });
  let buffer = "";
  activeProcess.stdout?.on("data", (data) => {
    buffer += data.toString();
    const lines = buffer.split("\n");
    buffer = lines.pop() || "";
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed) continue;
      try {
        const parsed = JSON.parse(trimmed);
        win.webContents.send("claude:stream", parsed);
      } catch {
      }
    }
  });
  activeProcess.stderr?.on("data", (data) => {
    const text = data.toString();
    win.webContents.send("claude:stderr", text);
  });
  activeProcess.on("close", (code) => {
    if (buffer.trim()) {
      try {
        const parsed = JSON.parse(buffer.trim());
        win.webContents.send("claude:stream", parsed);
      } catch {
      }
    }
    win.webContents.send("claude:done", { code });
    activeProcess = null;
  });
  activeProcess.on("error", (err) => {
    win.webContents.send("claude:error", {
      message: err.message,
      hint: "Make sure claude CLI is installed and in your PATH. Run: npm install -g @anthropic-ai/claude-code"
    });
    activeProcess = null;
  });
}
function abortClaude() {
  if (activeProcess) {
    activeProcess.kill("SIGTERM");
    activeProcess = null;
  }
}
function isClaudeRunning() {
  return activeProcess !== null;
}
const SESSIONS_FILE = "sessions.json";
function getSessionsPath() {
  const userDataPath = electron.app.getPath("userData");
  return path.join(userDataPath, SESSIONS_FILE);
}
function readSessions() {
  const filePath = getSessionsPath();
  try {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, "utf-8");
      return JSON.parse(data);
    }
  } catch {
  }
  return [];
}
function writeSessions(sessions) {
  const filePath = getSessionsPath();
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(filePath, JSON.stringify(sessions, null, 2));
}
function saveSession(session) {
  const sessions = readSessions();
  const existingIndex = sessions.findIndex((s) => s.id === session.id);
  if (existingIndex >= 0) {
    sessions[existingIndex] = session;
  } else {
    sessions.unshift(session);
  }
  writeSessions(sessions);
}
function listSessions() {
  return readSessions().sort((a, b) => b.lastMessageAt - a.lastMessageAt);
}
function deleteSession(sessionId) {
  const sessions = readSessions().filter((s) => s.id !== sessionId);
  writeSessions(sessions);
}
let watcher = null;
const IGNORED_DIRS = /* @__PURE__ */ new Set([
  "node_modules",
  ".git",
  ".next",
  "dist",
  "out",
  "build",
  ".cache",
  ".turbo",
  "__pycache__",
  ".DS_Store",
  "release"
]);
function buildTree(dirPath, depth = 0, maxDepth = 3) {
  if (depth >= maxDepth) return [];
  try {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });
    const nodes = [];
    const sorted = entries.filter((e) => !IGNORED_DIRS.has(e.name) && !e.name.startsWith(".")).sort((a, b) => {
      if (a.isDirectory() !== b.isDirectory()) {
        return a.isDirectory() ? -1 : 1;
      }
      return a.name.localeCompare(b.name);
    });
    for (const entry of sorted) {
      const fullPath = path.join(dirPath, entry.name);
      const node = {
        name: entry.name,
        path: fullPath,
        isDirectory: entry.isDirectory()
      };
      if (entry.isDirectory()) {
        node.children = buildTree(fullPath, depth + 1, maxDepth);
      }
      nodes.push(node);
    }
    return nodes;
  } catch {
    return [];
  }
}
function getFileTree(dirPath) {
  return buildTree(dirPath);
}
function watchDirectory(win, dirPath) {
  stopWatching();
  watcher = chokidar.watch(dirPath, {
    ignored: /(^|[/\\])(\.git|node_modules|\.next|dist|out|build)/,
    persistent: true,
    depth: 3,
    ignoreInitial: true
  });
  const sendUpdate = () => {
    const tree = buildTree(dirPath);
    win.webContents.send("filetree:update", tree);
  };
  let timeout = null;
  const debouncedUpdate = () => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(sendUpdate, 500);
  };
  watcher.on("add", debouncedUpdate);
  watcher.on("unlink", debouncedUpdate);
  watcher.on("addDir", debouncedUpdate);
  watcher.on("unlinkDir", debouncedUpdate);
}
function stopWatching() {
  if (watcher) {
    watcher.close();
    watcher = null;
  }
}
let currentWorkingDir = process.env.NALY_CWD || process.cwd();
function registerIpcHandlers(win) {
  electron.ipcMain.on("claude:send", (_event, { prompt, sessionId, permissionMode }) => {
    spawnClaude(win, {
      prompt,
      sessionId,
      workingDirectory: currentWorkingDir,
      permissionMode: permissionMode || "acceptEdits"
    });
  });
  electron.ipcMain.on("claude:abort", () => {
    abortClaude();
  });
  electron.ipcMain.handle("claude:isRunning", () => {
    return isClaudeRunning();
  });
  electron.ipcMain.handle("sessions:list", () => {
    return listSessions();
  });
  electron.ipcMain.handle("sessions:save", (_event, session) => {
    saveSession(session);
  });
  electron.ipcMain.handle("sessions:delete", (_event, sessionId) => {
    deleteSession(sessionId);
  });
  electron.ipcMain.handle("filetree:get", () => {
    return getFileTree(currentWorkingDir);
  });
  electron.ipcMain.on("filetree:watch", () => {
    watchDirectory(win, currentWorkingDir);
  });
  electron.ipcMain.on("filetree:stop", () => {
    stopWatching();
  });
  electron.ipcMain.handle("cwd:get", () => {
    return currentWorkingDir;
  });
  electron.ipcMain.handle("cwd:set", (_event, newCwd) => {
    currentWorkingDir = newCwd;
    stopWatching();
    watchDirectory(win, currentWorkingDir);
    return currentWorkingDir;
  });
  electron.ipcMain.handle("cwd:select", async () => {
    const result = await electron.dialog.showOpenDialog(win, {
      properties: ["openDirectory"],
      title: "Select Working Directory"
    });
    if (!result.canceled && result.filePaths[0]) {
      currentWorkingDir = result.filePaths[0];
      stopWatching();
      watchDirectory(win, currentWorkingDir);
      return currentWorkingDir;
    }
    return null;
  });
}
let pty = null;
try {
  pty = require("node-pty");
} catch {
  console.warn("node-pty not available, raw terminal mode disabled");
}
let activePty = null;
function registerPtyHandlers(win) {
  if (!pty) return;
  electron.ipcMain.on("pty:spawn", (_event, { cwd }) => {
    if (activePty) {
      activePty.kill();
      activePty = null;
    }
    const shell = process.env.SHELL || (os.platform() === "win32" ? "powershell.exe" : "/bin/zsh");
    try {
      activePty = pty.spawn(shell, [], {
        name: "xterm-256color",
        cols: 120,
        rows: 30,
        cwd: cwd || os.homedir(),
        env: process.env
      });
      activePty.onData((data) => {
        win.webContents.send("pty:data", data);
      });
      activePty.onExit(({ exitCode }) => {
        win.webContents.send("pty:exit", exitCode);
        activePty = null;
      });
    } catch (err) {
      console.error("Failed to spawn PTY:", err);
      win.webContents.send("pty:error", {
        message: err instanceof Error ? err.message : String(err)
      });
    }
  });
  electron.ipcMain.on("pty:write", (_event, data) => {
    activePty?.write(data);
  });
  electron.ipcMain.on("pty:resize", (_event, { cols, rows }) => {
    activePty?.resize(cols, rows);
  });
  electron.ipcMain.on("pty:kill", () => {
    activePty?.kill();
    activePty = null;
  });
}
function cleanupPty() {
  activePty?.kill();
  activePty = null;
}
function parseLaunchArgs(argv) {
  let prompt = process.env.NALY_PROMPT || "";
  let cwd = process.env.NALY_CWD || "";
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--prompt" && argv[i + 1]) {
      prompt = argv[i + 1];
      i++;
    } else if (argv[i] === "--cwd" && argv[i + 1]) {
      cwd = argv[i + 1];
      i++;
    }
  }
  return { prompt, cwd };
}
let mainWindow = null;
let pendingArgs = null;
function sendInitialPrompt(win, args) {
  if (args.prompt || args.cwd) {
    win.webContents.send("claude:initial", {
      prompt: args.prompt,
      cwd: args.cwd
    });
  }
}
function createWindow() {
  const win = new electron.BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    titleBarStyle: "hiddenInset",
    trafficLightPosition: { x: 16, y: 16 },
    backgroundColor: "#0a0a0a",
    show: false,
    webPreferences: {
      preload: path.join(__dirname, "../preload/index.js"),
      sandbox: false,
      contextIsolation: true,
      nodeIntegration: false
    }
  });
  win.on("ready-to-show", () => {
    win.show();
    if (pendingArgs) {
      sendInitialPrompt(win, pendingArgs);
      pendingArgs = null;
    }
  });
  win.webContents.setWindowOpenHandler((details) => {
    electron.shell.openExternal(details.url);
    return { action: "deny" };
  });
  if (utils.is.dev && process.env["ELECTRON_RENDERER_URL"]) {
    win.loadURL(process.env["ELECTRON_RENDERER_URL"]);
  } else {
    win.loadFile(path.join(__dirname, "../renderer/index.html"));
  }
  registerIpcHandlers(win);
  registerPtyHandlers(win);
  return win;
}
const gotTheLock = electron.app.requestSingleInstanceLock();
if (!gotTheLock) {
  electron.app.quit();
} else {
  electron.app.on("second-instance", (_event, argv) => {
    const args = parseLaunchArgs(argv);
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
      sendInitialPrompt(mainWindow, args);
    }
  });
  electron.app.whenReady().then(() => {
    utils.electronApp.setAppUserModelId("dev.naly.terminal");
    electron.app.on("browser-window-created", (_, window) => {
      utils.optimizer.watchWindowShortcuts(window);
    });
    pendingArgs = parseLaunchArgs(process.argv);
    mainWindow = createWindow();
    electron.app.on("activate", () => {
      if (electron.BrowserWindow.getAllWindows().length === 0) {
        mainWindow = createWindow();
      }
    });
  });
  electron.app.on("window-all-closed", () => {
    cleanupPty();
    mainWindow = null;
    if (process.platform !== "darwin") {
      electron.app.quit();
    }
  });
}
