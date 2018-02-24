import React, { Component } from 'react';

import CheckBox from '../Shared/CheckBox.jsx';
import { toast } from 'react-toastify';
import store from '../../core/store';
import fs from 'fs';
import path from 'path';

export default class AvailableLibraryCheckBox extends Component {
  
  constructor(props) {
    super(props);
  }

  updateLibrary(state, value){
    let default_toast_config = {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
      closeOnClick: true,
      hideProgressBar: true
    };

    if (state) {
      toast.success(`Added ${value} to project`, default_toast_config);
      this.addLibToProject();
    }
    else {
      toast.info(`Removed ${value} from project`, default_toast_config);
    }
  }

  addLibToProject() {
    let lib = this.props.name;
    if (lib) {
      let project = store.getChild('projects', '_id', this.props.project);
      let lib_path = path.resolve(
        __dirname, '../../../static/libraries', lib
      );
      if (process.env.NODE_ENV === 'production') {
        lib_path = path.resolve(__dirname, 'static/libraries', lib);
      }
      
      if (project) {
        fs.createReadStream(lib_path).pipe(
          fs.createWriteStream(path.resolve(
            project.path, 'libraries', lib
          ))
        );
      }
    }
  }

  render() {
    return (
      <li>
        <CheckBox value={this.props.name} onChange={this.updateLibrary.bind(this)} /> 
        {this.props.name}
      </li>
    );
  }
}