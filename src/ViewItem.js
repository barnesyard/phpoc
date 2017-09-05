import React, { Component } from 'react';
import './index.css';

class ViewItem extends Component {

  handleClick() {
    // There will be decorative objects that won't be clickable. Those won't have a puzzle associated with them.
    if (this.props.puzzleId) {
      // Pass the puzzle ID that is associated with the room items back up to game object
      // where it will do the right thing. Some puzzles may require an object before the item is clickable. 
      this.props.roomItemClicked(this.props.puzzleId, this.props.requiredItems);
    }
  }

  render() {
    let status = this.props.getRoomItemStatus(this.props.puzzleId);
    let grayscale = status === 'unlocked' ? 'grayscale(100%)' : 'grayscale(0%)';
    let style = {
      width: this.props.width,
      position: 'absolute',
      top: this.props.top,
      left: this.props.left,
      filter: grayscale, // this will allow us to idicate things that have not been clicked
    };

    return (
      (status === 'hidden') ?  null : <img src={this.props.svg} className={this.props.name} alt={this.props.name} style={style} onClick={() => this.handleClick()}/>
    );
  }
}

export default ViewItem;