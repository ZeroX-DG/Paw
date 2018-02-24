import React, { Component } from 'react';

import CheckBox from '../Shared/CheckBox.jsx';
import { toast } from 'react-toastify';

export default class AvailableLibraryCheckBox extends Component {

  updateLibrary(state, value){
    let default_toast_config = {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
      closeOnClick: true,
      hideProgressBar: true
    };

    if (state) {
      toast.success(`Added ${value} to project`, default_toast_config);
    }
    else {
      toast.info(`Removed ${value} from project`, default_toast_config);
    }
  }

  render() {
    return (
      <li>
        <CheckBox value={this.props.name} onChange={this.updateLibrary} /> 
        {this.props.name}
      </li>
    );
  }
}