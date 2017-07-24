import React, { Component } from 'react';
import './index.css';
import Room from './Room.js';

class View extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    let scaleFactor = this.props.isInfoMode ? .8 : 1;
    let style = {
     width: this.props.viewWidth + 'px',
     height: this.props.viewHeight + 'px',
     zoom: scaleFactor,
    };

  return (
      <div className="view" style={style}>
        <Room 
          currentRoom="one"
          viewHeight = {this.props.viewHeight}
          viewWidth = {this.props.viewWidth}
          showPuzzle = {() => this.props.showPuzzle()}
          isInfoMode = {this.props.isInfoMode}
        />
      </div>
    );
  }
}

export default View;
