import React, { Component, Fragment } from 'react';

import './home-route.scss';

import FullHeightPanel from '../../components/full-height-panel/full-height-panel.jsx';
import ProjectList from '../../components/project-list/project-list.jsx';
import LibraryList from '../../components/library-list/library-list.jsx';
import Button from '../../components/button/button.jsx';
import ScrollableArea from '../../components/scrollable-area/scrollable-area.jsx';
import NewLibraryModal from './new-library-modal/new-library-modal.jsx';
import EventManager from '../../common/EventManager';

export default class HomeRoute extends Component {

  openNewLibraryModal() {
    let library_modal = <NewLibraryModal />;
    EventManager.emit('openModal', library_modal);
  }

  render() {
    return (
      <div className="home-route">
        <FullHeightPanel className="section" style={{background: '#2a2d3b'}} side="left">

          <h1 className="section-title">Projects</h1>

          <div className="button-group" style={{marginBottom: '20px'}}>
            <Button>New project</Button>
          </div>
          <ScrollableArea>
            <ProjectList />
          </ScrollableArea>

        </FullHeightPanel>

        <FullHeightPanel className="section" style={{background: '#12141a'}} side="right">
        
          <h1 className="section-title">Libraries</h1>

          <div className="button-group" style={{marginBottom: '20px'}}>
            <Button onClick={this.openNewLibraryModal}>New library</Button>
          </div>

          <ScrollableArea>
            <LibraryList />
          </ScrollableArea>

        </FullHeightPanel>
      </div>
    );
  }

}