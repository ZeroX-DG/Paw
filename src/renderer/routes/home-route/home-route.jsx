import React, { Component } from 'react';

import './home-route.scss';

import FullHeightPanel from '../../components/full-height-panel/full-height-panel.jsx';
import ProjectList from '../../components/project-list/project-list.jsx';
import LibraryList from '../../components/library-list/library-list.jsx';
import Button from '../../components/button/button.jsx';

export default class HomeRoute extends Component {

  render() {
    return (
      <div className="home-route">
        <FullHeightPanel style={{
          width: '50%',
          background: '#2a2d3b',
          padding: '20px'
        }} side="left">

          <h1 style={{
            color: '#f3cc84',
            fontSize: '30px',
            height: '50px'
          }}>Projects</h1>

          <div className="button-group" style={{marginBottom: '20px'}}>
            <Button>New project</Button>
          </div>

          <ProjectList />

        </FullHeightPanel>

        <FullHeightPanel style={{
          width: '50%',
          background: '#12141a',
          padding: '20px'
        }} side="right">

          <h1 style={{
            color: '#f3cc84',
            fontSize: '30px',
            height: '50px'
          }}>Libraries</h1>

          <div className="button-group" style={{marginBottom: '20px'}}>
            <Button>New library</Button>
          </div>

          <LibraryList />

        </FullHeightPanel>
      </div>
    );
  }

}