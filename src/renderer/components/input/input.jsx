import React, { Component } from 'react';

import './input.scss';

export default class Input extends Component {

  render() {
    return (
      <input className="paw-input" {...this.props}/>
    );
  }

}