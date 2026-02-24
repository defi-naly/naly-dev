#!/usr/bin/env node

const { spawn } = require('child_process')
const path = require('path')
const fs = require('fs')

const prompt = process.argv.slice(2).join(' ')
const cwd = process.cwd()

const env = { ...process.env, NALY_CWD: cwd }
if (prompt) {
  env.NALY_PROMPT = prompt
}

// Resolve paths relative to this script's location
const packageRoot = path.resolve(__dirname, '..')
const mainScript = path.join(packageRoot, 'out', 'main', 'index.js')
const electronBin = path.join(packageRoot, 'node_modules', '.bin', 'electron')

// Production: try the installed .app bundle (macOS)
const appPath = '/Applications/Naly Terminal.app'
const isProduction = !fs.existsSync(electronBin) && fs.existsSync(appPath)

if (isProduction) {
  const args = ['--args']
  if (prompt) args.push('--prompt', prompt)
  args.push('--cwd', cwd)

  const child = spawn('open', ['-a', 'Naly Terminal', ...args], {
    stdio: 'ignore',
    detached: true,
    env
  })
  child.unref()
} else {
  // Dev: launch via electron binary directly
  if (!fs.existsSync(electronBin)) {
    console.error('Error: electron not found. Run `npm install` in naly-terminal/ first.')
    process.exit(1)
  }

  const args = [mainScript]
  if (prompt) args.push('--prompt', prompt)
  args.push('--cwd', cwd)

  const child = spawn(electronBin, args, {
    stdio: 'ignore',
    detached: true,
    env
  })
  child.unref()
}

process.exit(0)
