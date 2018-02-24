import React, { Component } from 'react';

import './CheckBox.scss';

export default class CheckBox extends Component {

  constructor(props) {
    super(props);
    this.state = {
      checked: false
    };
  }

  check() {
    this.props.onChange(!this.state.checked, this.props.value);
    this.setState({ checked: !this.state.checked });
  }

  render() {
    return (
      <div className={`checkbox ${this.state.checked ? 'checked' : ''}`}
        onClick={this.check.bind(this)}>
        <span className="checkmark">
          <i className="material-icons">check</i>
        </span>
      </div>
    );
  }
}