import React, { Component } from 'react';
import './index.css';
import Button from './Button.js';

class View extends Component {

  constructor(props) {
    super(props);
    this.state = {
      viewWidth: this.props.gameWidth - 10,
      viewHeight: this.props.gameHeight - 10,
    }
  }

  render() {
   let style = {
    width: this.state.viewWidth + 'px',
    height: this.state.viewHeight + 'px',
    transform: 'translate3d(5px,5px,0)',
   };

  return (
      <div className="view" style={style}>
        <Button/>
      </div>
    );
  }
}

export default View;
