import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import EventManager from '../../common/EventManager';
import {generateID} from '../../common/common';
import Modal from './modal.jsx';

export default class ModalList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modals: new Map()
    };
  }

  componentWillMount() {
    EventManager.on('openModal', (modal) => {
      this.state.modals.set(generateID(), modal);
      this.forceUpdate();
    });

    EventManager.on('dismissModal', (modal_id) => {
      this.state.modals.delete(modal_id);
      this.forceUpdate();
    });
  }

  render() {
    return (
      <div className="modal-list">
        {
          [...this.state.modals].map((modal_prop) => {
            let id = modal_prop[0];
            let content = modal_prop[1];

            return <Modal key={id} id={id} content={content} />
          })
        }
      </div>
    );
  }
}