import React, { Component } from 'react';

class Button extends Component {
  constructor(props) {
    super(props);
  }

  render () {
  let buttonStyle = {
    top: this.props.modeBtnTop + 'px',
    left: this.props.modeBtnLeft + 'px',
  };

    return (
      <button
        className="btn"
        style={buttonStyle}
        onClick={this.props.onClick}
        >{this.props.btnLabel}</button>
    );
  }
}

export default Button;