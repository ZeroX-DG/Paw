import React, { Component } from 'react';
import store from '../core/store.js';

import './ProjectDetailsPanel.scss';

export default class ProjectDetailsPanel extends Component {

  constructor(props) {
    super(props);
    this.state = {
      project: store.getChild('projects', '_id', this.props.match.params.id)
    };
  }

  render() {
    let project = this.state.project;
    return (
      <div className="project-details-panel">
        <h1 className="project-name">{project.name}</h1>
      </div>
    );
  }
}