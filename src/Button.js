import React, { Component } from 'react';
import './index.css';

var buttonStyle = {
  margin: '5px 1px 1px 10px'
};

var Button = React.createClass({
  render: function () {
    return (
      <button
        className="btn"
        style={buttonStyle}
        //onClick={this.props.handleClick}
        >i</button>
    );
  }
});

export default Button;