import React, { Component } from 'react';

import './project-list.scss';
import ProjectItem from './project-item.jsx';
import Button from '../button/button.jsx';
import ProjectEngine from '../../engines/ProjectEngine';

export default class ProjectList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      projects: ProjectEngine.getListProject()
    };
  }

  render() {

    let projects = this.state.projects;

    return (
      <div className="project-list">
        {projects.length ? projects.map((project, i) => (
          <ProjectItem name={project.name} 
                        path={project.path}
                        id={project._id}
                        key={project._id} />
        )): <h1 style={{
          color: '#878da9',
          fontSize: '30px',
          textAlign: 'center',
          marginTop: '30%'
        }}>Click new project to import or create new project</h1>}
      </div>
    );
  }
}