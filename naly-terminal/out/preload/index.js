"use strict";
const electron = require("electron");
const api = {
  // Initial prompt from CLI launch
  onInitialPrompt: (callback) => {
    const handler = (_, data) => callback(data);
    electron.ipcRenderer.on("claude:initial", handler);
    return () => electron.ipcRenderer.removeListener("claude:initial", handler);
  },
  // Claude process
  claude: {
    send: (prompt, sessionId, permissionMode) => {
      electron.ipcRenderer.send("claude:send", { prompt, sessionId, permissionMode });
    },
    abort: () => {
      electron.ipcRenderer.send("claude:abort");
    },
    isRunning: () => electron.ipcRenderer.invoke("claude:isRunning"),
    onStream: (callback) => {
      const handler = (_, data) => callback(data);
      electron.ipcRenderer.on("claude:stream", handler);
      return () => electron.ipcRenderer.removeListener("claude:stream", handler);
    },
    onStderr: (callback) => {
      const handler = (_, text) => callback(text);
      electron.ipcRenderer.on("claude:stderr", handler);
      return () => electron.ipcRenderer.removeListener("claude:stderr", handler);
    },
    onDone: (callback) => {
      const handler = (_, data) => callback(data);
      electron.ipcRenderer.on("claude:done", handler);
      return () => electron.ipcRenderer.removeListener("claude:done", handler);
    },
    onError: (callback) => {
      const handler = (_, data) => callback(data);
      electron.ipcRenderer.on("claude:error", handler);
      return () => electron.ipcRenderer.removeListener("claude:error", handler);
    }
  },
  // Sessions
  sessions: {
    list: () => electron.ipcRenderer.invoke("sessions:list"),
    save: (session) => electron.ipcRenderer.invoke("sessions:save", session),
    delete: (sessionId) => electron.ipcRenderer.invoke("sessions:delete", sessionId)
  },
  // File tree
  filetree: {
    get: () => electron.ipcRenderer.invoke("filetree:get"),
    watch: () => electron.ipcRenderer.send("filetree:watch"),
    stop: () => electron.ipcRenderer.send("filetree:stop"),
    onUpdate: (callback) => {
      const handler = (_, data) => callback(data);
      electron.ipcRenderer.on("filetree:update", handler);
      return () => electron.ipcRenderer.removeListener("filetree:update", handler);
    }
  },
  // Working directory
  cwd: {
    get: () => electron.ipcRenderer.invoke("cwd:get"),
    set: (cwd) => electron.ipcRenderer.invoke("cwd:set", cwd),
    select: () => electron.ipcRenderer.invoke("cwd:select")
  },
  // PTY (raw terminal)
  pty: {
    spawn: (cwd) => {
      electron.ipcRenderer.send("pty:spawn", { cwd });
    },
    write: (data) => {
      electron.ipcRenderer.send("pty:write", data);
    },
    resize: (cols, rows) => {
      electron.ipcRenderer.send("pty:resize", { cols, rows });
    },
    kill: () => {
      electron.ipcRenderer.send("pty:kill");
    },
    onData: (callback) => {
      const handler = (_, data) => callback(data);
      electron.ipcRenderer.on("pty:data", handler);
      return () => electron.ipcRenderer.removeListener("pty:data", handler);
    },
    onExit: (callback) => {
      const handler = (_, code) => callback(code);
      electron.ipcRenderer.on("pty:exit", handler);
      return () => electron.ipcRenderer.removeListener("pty:exit", handler);
    },
    onError: (callback) => {
      const handler = (_, data) => callback(data);
      electron.ipcRenderer.on("pty:error", handler);
      return () => electron.ipcRenderer.removeListener("pty:error", handler);
    }
  }
};
electron.contextBridge.exposeInMainWorld("api", api);
