import electron from 'electron';
import path from 'path';
import fs from 'fs';
import {APP} from '../../config';

class StoreEngine {
  constructor() {
    const userDataPath = (electron.app || electron.remote.app).getPath('userData');
    this.path = path.join(userDataPath, APP.data_file);
    this.data = parseDataFile(this.path);
  }

  get(key) {
    return this.data[key];
  }
  
  set(key, val) {
    this.data[key] = val;
    this.save();
  }

  remove(key, attr, value) {
    for(let i = 0; i < this.data[key].length; i++) {
      if (this.data[key][i][attr] === value) {
        delete this.data[key][i];
      }
    }
    this.save();
  }

  save() {
    try {
      fs.writeFileSync(this.path, JSON.stringify(this.data));
    }
    catch(error) {
      console.log(error);
      return;
    }
  }
}

function parseDataFile(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath));
  } catch(error) {
    return {};
  }
}

export default new StoreEngine;
