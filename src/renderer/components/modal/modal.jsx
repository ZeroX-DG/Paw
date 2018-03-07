import React, { Component, Fragment } from 'react';
import EventManager from '../../common/EventManager';

import './modal.scss';

export default class Modal extends Component {

  dismiss() {
    EventManager.emit('dismissModal', this.props.id);
  }

  render() {
    return (
      <Fragment>
        <div className="modal-overlay" onClick={this.dismiss.bind(this)}>
        </div>
        <div className="modal">
          {this.props.content}
        </div>
      </Fragment>
    );
  }
}