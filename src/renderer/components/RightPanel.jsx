import React, { Component } from 'react';

import './RightPanel.scss';
import LibraryPanel from './RightPanel/LibraryPanel.jsx';
import Button from './Shared/Button.jsx';
import store from '../core/store.js';

export default class RightPanel extends Component {

  render() {
    let libraries = store.get('libraries') || [];
    return (
      <div className="right-panel">
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