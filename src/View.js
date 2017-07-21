import React, { Component } from 'react';
import './index.css';
import Room from './Room.js';

class View extends Component {

  constructor(props) {
    super(props);
  }

  render() {
   let style = {
     width: this.props.viewWidth + 'px',
     height: this.props.viewHeight + 'px',
   };

  return (
      <div className="view" style={style}>
        <Room 
          currentRoom="one"
          viewHeight = {this.props.viewHeight}
          viewWidth = {this.props.viewWidth}
          showPuzzle = {() => this.props.showPuzzle()}
        />
      </div>
    );
  }
}

export default View;
