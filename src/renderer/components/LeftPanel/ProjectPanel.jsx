import React, { Component } from 'react';

import './ProjectPanel.scss';

export default class ProjectPanel extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="project-panel">
        <div className="close-button">&#10005;</div>
        <p className="project-name">{this.props.name}</p>
        <p className="project-path">{this.props.path}</p>
      </div>
    );
  }
}