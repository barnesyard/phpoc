import React, { Component } from 'react';
import './index.css';
import { roomdata } from './roomdata.js';
import RoomItem from './RoomItem.js';

class View extends Component {

  showPuzzle(puzzle) {
    this.props.showPuzzle(puzzle);
  }

render() {
  // Is this where we should put in the scale factor? Need to think about how this works and maybe redesign    
  //let scaleFactor = this.props.isInfoMode ? .8 * this.props.scaleFactor: this.props.scaleFactor;
    let scaleFactor = this.props.isInfoMode ? .8 : 1;
    let style = {
     width: this.props.viewWidth + 'px',
     height: this.props.viewHeight + 'px',
     zoom: scaleFactor,
    };

    let allRooms = roomdata(() => this.handleClick());
    let room = allRooms[0]; 
    let roomItems = [];
    room.items.forEach((roomItem) => {
      roomItems.push(
        <RoomItem
          showPuzzle={(puzzle) => this.showPuzzle(puzzle)}
          viewHeight={this.props.viewHeight}
          viewWidth={this.props.viewWidth}
          svg={roomItem.svg}
          name={roomItem.name}
          isHidden={roomItem.isHidden}
          puzzle={roomItem.puzzle}
          top={roomItem.top}
          left={roomItem.left}
          requiredItems={roomItem.requiredItems}/>) 
    })
    
  return (
      <div className="view" style={style}>
        {roomItems}
      </div>
    );
  }
}

export default View;
