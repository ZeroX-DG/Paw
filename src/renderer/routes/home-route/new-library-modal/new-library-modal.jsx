import React, { Component, Fragment } from 'react';
import Button from '../../../components/button/button.jsx';
import Input from '../../../components/input/input.jsx';
import EventManager from '../../../common/EventManager';

import './new-library-modal.scss';

export default class NewLibraryModal extends Component {

  dismiss() {
    EventManager.emit('dismissModal', this.props.id);
  }

  render() {
    return (
      <Fragment>
        <h1 className="modal-title">New library</h1>

        <p className="form-label">Name</p>
        <Input type="text" 
              placeholder="Enter library name..." 
              id="name"
              style={{marginBottom: '20px'}}/>

        <p className="form-label">Link</p>
        <Input type="text" 
              placeholder="Enter library link..." 
              id="link"
              style={{marginBottom: '20px'}}/>

        <p className="form-label">Version</p>
        <Input type="text" 
              placeholder="Enter library version..." 
              id="version"
              style={{marginBottom: '20px'}}/>

        <Button>Add library</Button>
      </Fragment>
    );
  }
}