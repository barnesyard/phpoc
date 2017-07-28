import React, { Component } from 'react';
import './index.css';
import { viewdata } from './viewdata.js';
import ViewItem from './ViewItem.js';

class Room extends Component {

  showPuzzle(puzzle) {
    console.log("The rootitem object called the view with this: " + puzzle);
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

    let allViews = viewdata;
    let viewItems = [];
    allViews[0].items.forEach((viewItem) => {
      viewItems.push(
        <ViewItem
          showPuzzle={(puzzle) => this.showPuzzle(puzzle)}
          viewHeight={this.props.viewHeight}
          viewWidth={this.props.viewWidth}
          svg={viewItem.svg}
          name={viewItem.name}
          isHidden={viewItem.isHidden}
          puzzle={viewItem.puzzle}
          top={viewItem.top}
          left={viewItem.left}
          requiredItems={viewItem.requiredItems}/>) 
    })
    
  return (
      <div className="room" style={style}>
        {viewItems}
      </div>
    );
  }
}

export default Room;
