import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import './project-item.scss';
import Button from '../button/button.jsx';

export default class ProjectItem extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="project-item">
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