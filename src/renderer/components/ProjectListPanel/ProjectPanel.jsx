import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import './ProjectPanel.scss';
import Button from '../Public/Button.jsx';

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
        <p style={{marginTop: '20px'}}>
          <Link to={'/project/' + this.props.id}>
            <Button>View project</Button>
          </Link>
        </p>
      </div>
    );
  }
}