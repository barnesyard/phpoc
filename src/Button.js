import React, { Component } from 'react';

class Button extends Component {
  constructor(props) {
    super(props);
  }

  render () {
  let buttonStyle = {
    position: 'absolute',
    top: this.props.modeBtnTop + 'px',
    left: this.props.modeBtnLeft + 'px',
  };

    return (
      <button
        className="btn"
        style={buttonStyle}
        onClick={this.props.onClick}
        >i</button>
    );
  }
}

export default Button;