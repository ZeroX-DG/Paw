import React, { Component } from 'react';

import CheckBox from '../Shared/CheckBox.jsx';
import { toast } from 'react-toastify';
import store from '../../core/store';
import { 
  addLib, 
  removeLib, 
  isLibExistsInProject 
} from '../../core/libManager';

import path from 'path';

export default class AvailableLibraryCheckBox extends Component {
  
  constructor(props) {
    super(props);
    let lib = this.props.name;
    const PROJECT = store.getChild('projects', '_id', this.props.project);
    const LIB_EXISTS = isLibExistsInProject(lib, PROJECT.path);
    this.state = {
      initState: LIB_EXISTS
    };
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
        }).catch((err) => {
          this.checkbox.setState({checked: false});
          console.log(err);
          toast.error(`Error while adding ${value} to project`, DEFAULT_TOAST_CONFIG);
        });
      }
    }
    else {
      let actionAfterRemoveLib = this.removeLibFromProject();

      if (actionAfterRemoveLib) {
        actionAfterRemoveLib.then(() => {
          toast.info(`Removed ${value} from project`, DEFAULT_TOAST_CONFIG);
        }).catch((err) => {
          this.checkbox.setState({checked: true});
          console.log(err);
          toast.info(`Removed ${value} from project`, DEFAULT_TOAST_CONFIG);
        });
      }
    }
  }

  addLibToProject() {
    let lib = this.props.name;
    const PROJECT = store.getChild('projects', '_id', this.props.project);
    if (PROJECT) {
      return addLib(lib, PROJECT.path);
    }
  }

  removeLibFromProject() {
    let lib = this.props.name;
    const PROJECT = store.getChild('projects', '_id', this.props.project);
    if (PROJECT) {
      return removeLib(lib, PROJECT.path);
    }
  }

  render() {
    return (
      <li>
        <CheckBox ref={(checkbox) => {this.checkbox = checkbox}}
                  checked={this.state.initState} 
                  value={this.props.name} 
                  onChange={this.updateLibrary.bind(this)} /> 
        {this.props.name}
      </li>
    );
  }
}