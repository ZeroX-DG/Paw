import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import './project-details-route.scss';

import LibraryEngine from '../../engines/LibraryEngine';
import ProjectEngine from '../../engines/ProjectEngine';

import CheckBox from '../../components/check-box/check-box.jsx';

export default class ProjectDetailsPanel extends Component {

  constructor(props) {
    super(props);
    this.state = {
      project: ProjectEngine.getProjectById(this.props.params.id),
      libraries: LibraryEngine.getLibraryList()
    };
  }

  render() {
    return (
      <div className="project-details-panel">
        <Link to="/">
          <div className="close-button">&#10005;</div>
        </Link>
        <h1 className="project-name">{project.name}</h1>
        <p className="section-title">Libraries</p>
        <div className="library-list" id="available-libraries">
          <ul>
            {this.state.libraries.map((library, i) => (
              <li key={library._id}>
                <CheckBox /> {library.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}