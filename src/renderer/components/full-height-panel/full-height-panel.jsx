import React, { Component } from 'react';

import './full-height-panel.scss';

export default class FullHeightPanel extends Component {

  render(){
    let { side, style, className } = this.props;
    let left = {
      left: (side == 'right' ? '50%' : '0%')
    };
    style = Object.assign({}, style, left);
    className = 'panel-full-height ' + className;
    return (
      <div className={className} style={style}>
        {this.props.children}
      </div>
    );
  }
}