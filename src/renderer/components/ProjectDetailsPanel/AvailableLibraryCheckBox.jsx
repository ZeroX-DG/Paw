import React, { Component } from 'react';

import CheckBox from '../Shared/CheckBox.jsx';
import { toast } from 'react-toastify';
import store from '../../core/store';
import fs from 'fs-extra';
import path from 'path';

export default class AvailableLibraryCheckBox extends Component {
  
  constructor(props) {
    super(props);
  }

  updateLibrary(state, value){
    const DEFAULT_TOAST_CONFIG = {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
      closeOnClick: true,
      hideProgressBar: true
    };

    if (state) {
      let actionAfterAddLib = this.addLibToProject();
      // if there is a promise returned from the action
      if (actionAfterAddLib) {
        actionAfterAddLib.then(() => {
          toast.success(`Added ${value} to project`, DEFAULT_TOAST_CONFIG);
        }).catch(() => {
          toast.error(`Error while adding ${value} to project`, DEFAULT_TOAST_CONFIG);
        });
        return;
      }
      // if nothing was returned
      toast.error(`Error while adding ${value} to project`, DEFAULT_TOAST_CONFIG);
    }
    else {
      let actionAfterRemoveLib = this.removeLibFromProject();

      if (actionAfterRemoveLib) {
        actionAfterRemoveLib.then(() => {
          toast.info(`Removed ${value} from project`, DEFAULT_TOAST_CONFIG);
        }).catch(() => {
          toast.info(`Removed ${value} from project`, DEFAULT_TOAST_CONFIG);
        });
        return;
      }
      toast.error(`Error while removing ${value} from project`, DEFAULT_TOAST_CONFIG);
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
        const project_lib_path = path.resolve(
          project.path, 'libraries', lib
        );
        return fs.copy(lib_path, project_lib_path);
      }
    }
  }

  removeLibFromProject() {
    let lib = this.props.name;
    if (lib) {
      const PROJECT = store.getChild('projects', '_id', this.props.project);
      if (PROJECT) {
        const PROJECT_LIB_PATH = path.resolve(
          PROJECT.path, 'libraries', lib
        );
        return fs.remove(PROJECT_LIB_PATH);
      }
    }
  }

  render() {
    let lib = this.props.name;
    let is_lib_exists = false;
    if (lib) {
      let project = store.getChild('projects', '_id', this.props.project);
      if (project) {
        const PROJECT_LIB_PATH = path.resolve(
          project.path, 'libraries', lib
        );
        is_lib_exists = fs.pathExistsSync(PROJECT_LIB_PATH);
      }
    }
    
    return (
      <li>
        <CheckBox checked={is_lib_exists} value={this.props.name} onChange={this.updateLibrary.bind(this)} /> 
        {this.props.name}
      </li>
    );
  }
}