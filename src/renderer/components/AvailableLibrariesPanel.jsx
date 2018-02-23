import React, { Component } from 'react';

import './AvailableLibrariesPanel.scss';
import LibraryPanel from './AvailableLibrariesPanel/LibraryPanel.jsx';
import Button from './Shared/Button.jsx';
import store from '../core/store.js';

export default class AvailableLibrariesPanel extends Component {

  render() {
    let libraries = store.get('available_libraries') || [];
    return (
      <div className="available-libraries-panel">
        <h1 style={{fontSize: '30px', height: '50px', color: 'white'}}>
          Libraries
        </h1>
        <div className="button-group" style={{marginBottom: '20px'}}>
          <Button>New Library</Button>
        </div>
        {libraries.map((library, i) => (
          <LibraryPanel name={library.name} 
                        version={library.version}
                        link={library.link} 
                        id={library._id}
                        key={library._id}
                        onClick={this.reRenderLibs} />
        ))}
      </div>
    );
  }
}