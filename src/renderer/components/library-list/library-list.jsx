import React, { Component } from 'react';

import './library-list.scss';
import LibraryItem from './library-item.jsx';
import LibraryEngine from '../../engines/LibraryEngine';

export default class LibraryList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      libraries: LibraryEngine.getLibraryList()
    };
  }

  render() {
    let libraries = this.state.libraries;
    return (
      <div className="library-list">
        {libraries.length ? libraries.map((library, i) => (
          <LibraryItem name={library.name} 
                        version={library.version}
                        link={library.link} 
                        id={library._id}
                        key={library._id} />
        )): <h1 style={{
          color: '#878da9',
          fontSize: '30px',
          textAlign: 'center',
          marginTop: '30%'
        }}>Click new library to import new library</h1>}
      </div>
    );
  }
}