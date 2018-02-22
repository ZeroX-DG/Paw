import React, { Component } from 'react';

import './LeftPanel.scss';
import ProjectPanel from './LeftPanel/ProjectPanel.jsx';
import Button from './Shared/Button.jsx';
import store from '../core/store.js';

export default class LeftPanel extends Component {
  render() {
    let projects = store.get('projects') || [];
    return (
      <div className="left-panel">
        <p style={{
            fontSize: '30px', 
            height: '50px', 
            color: 'white'
          }}>
          Projects
        </p>
        <div className="button-group" style={{marginBottom: '20px'}}>
          <Button>New Project</Button>
        </div>
        {projects.map((project, i) => (
          <ProjectPanel name={project.name} 
                        path={project.path} 
                        key={project._id} />
        ))}
      </div>
    );
  }
}