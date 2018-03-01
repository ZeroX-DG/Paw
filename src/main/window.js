import { BrowserWindow } from 'electron';
import { WINDOW, APP } from '../config';
import path from 'path';

const isDev = (process.argv || []).indexOf('--dev') !== -1;

export function createWindow() {
  const mainWindow = new BrowserWindow({
    title: WINDOW.title,
    width: 1300,
    height: 700,
    minWidth: 512,
    minHeight: 350
  });

  const winURL = isDev 
    ? 'http://localhost:' + APP.port 
    : `file://${__dirname}/index.html`;

  mainWindow.loadURL(winURL);
}