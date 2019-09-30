#!/usr/bin/env electron
const { app, BrowserWindow } = require("electron");

const target = process.argv[2] || "http://127.0.0.1:1234";

app.on("ready", () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    autoHideMenuBar: true,
    show: false,
    webPreferences: {
      devTools: true,
      nodeIntegration: false,
      experimentalFeatures: true
    }
  });
  win.maximize();
  win.loadURL("data:text/html,<!DOCTYPE html><title>Loading...</title>");
  win.webContents.once("devtools-opened", () => {
    win.loadURL(target);
    win.webContents.once("did-start-loading", () => win.show());
  });
  win.webContents.on("devtools-closed", () => {
    app.quit();
  });
  win.webContents.openDevTools({ mode: "detach" });
});

app.on("window-all-closed", () => app.quit());
