import React, { Component } from 'react';

import './library-item.scss';

export default class LibraryItem extends Component {

  constructor(props) {
    super(props);
    this.state = {show: true};
  }

  render() {
    if (this.state.show) {
      return (
        <div className="library-item">
          <div className="delete-button" onClick={this.props.deleteClick}>
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