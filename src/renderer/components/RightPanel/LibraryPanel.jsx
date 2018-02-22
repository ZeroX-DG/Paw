import React, { Component } from 'react';

import './LibraryPanel.scss';
import store from '../../core/store.js';

export default class LibraryPanel extends Component {

  constructor(props) {
    super(props);
    this.state = {show: true};
  }

  deleteThisLib() {
    store.remove('libraries', '_id', this.state.id);
    this.setState({show: false});
  }

  render() {
    if (this.state.show) {
      return (
        <div className="library-panel">
          <div className="delete-button" onClick={this.deleteThisLib.bind(this)}>
            <i className="material-icons">delete</i>
          </div>
          <p className="library-name">{this.props.name}</p>
          <p className="library-version">Version: {this.props.version}</p>
          <p className="library-link">{this.props.link}</p>
        </div>
      );
    }
    
    return null;
  }
}