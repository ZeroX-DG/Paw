import React, { Component } from 'react';
import store from '../core/store.js';
import {Link} from 'react-router-dom';

import './ProjectDetailsPanel.scss';
import CheckBox from './Public/CheckBox.jsx';
import AvailableLibraryCheckBox from './ProjectDetailsPanel/AvailableLibraryCheckBox.jsx';

export default class ProjectDetailsPanel extends Component {

  constructor(props) {
    super(props);
    this.state = {
      project: store.getChild('projects', '_id', this.props.match.params.id)
    };
  }

  render() {
    let project = this.state.project;
    let libraries = store.get('available_libraries') || [];
    return (
      <div className="project-details-panel">
        <Link to="/">
          <div className="close-button">&#10005;</div>
        </Link>
        <h1 className="project-name">{project.name}</h1>
        <p className="section-title">Libraries</p>
        <div className="library-list" id="available-libraries">
          <ul>
            {libraries.map((library, i) => (
              <AvailableLibraryCheckBox key={library._id} 
                                        name={library.name}
                                        project={project._id}
                                        id={library._id} />
            ))}
          </ul>
        </div>
      </div>
    );
  }
}