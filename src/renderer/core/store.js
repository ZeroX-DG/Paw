import electron from 'electron';
import path from 'path';
import fs from 'fs';
import config from '../../config';

class Store {
  constructor() {
    let userDataPath;
    if (process.env.NODE_ENV === 'testing') {
      userDataPath = config.APP.data_source_test;
    }
    else {
      userDataPath = (electron.app || electron.remote.app).getPath('userData');
    }
    this.path = path.join(userDataPath, 'paw_user_data.json');
    this.data = parseDataFile(this.path);
  }

  get(key) {
    return this.data[key];
  }
  
  set(key, val) {
    this.data[key] = val;
    try {
      fs.writeFileSync(this.path, JSON.stringify(this.data));
    }
    catch(error) {
      console.log(error);
      return;
    }
  }

  getChild(key, attr, value) {
    for(let i = 0; i < this.data[key].length; i++) {
      if (this.data[key][i][attr] === value) {
        return this.data[key][i];
      }
    }
    return null;
  }

  remove(key, attr, value) {
    for(let i = 0; i < this.data[key].length; i++) {
      if (this.data[key][i][attr] === value) {
        delete this.data[key][i];
      }
    }
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

const store = new Store();
export default store;