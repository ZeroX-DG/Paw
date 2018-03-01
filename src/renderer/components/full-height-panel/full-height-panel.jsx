import React, { Component } from 'react';

import './full-height-panel.scss';

export default class FullHeightPanel extends Component {

  render(){
    let { side, style } = this.props;
    let left = {
      left: (side == 'right' ? '50%' : '0%')
    };
    style = Object.assign({}, style, left);
    return (
      <div className="panel-full-height" style={style}>
        {this.props.children}
      </div>
    );
  }
}