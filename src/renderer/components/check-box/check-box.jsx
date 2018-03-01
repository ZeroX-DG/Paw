import React, { Component } from 'react';

import './check-box.scss';

export default class CheckBox extends Component {

  constructor(props) {
    super(props);
    this.state = {
      checked: props.checked
    };
  }

  check() {
    this.props.onChange(!this.state.checked, this.props.value);
    this.setState({ checked: !this.state.checked });
  }

  render() {
    return (
      <div className="checkbox-wrapper">
        <div className={`checkbox ${this.state.checked ? 'checked' : ''}`}
          onClick={this.check.bind(this)}>
          <span className="checkmark">
            <i className="material-icons">check</i>
          </span>
        </div>
      </div>
    );
  }
}