import React, { Component } from 'react';
import './index.css';

class ViewItem extends Component {

handleClick() {
  // There will be decorative objects that won't be clickable. Those won't have a puzzle associated with them.
  if (this.props.puzzle !== "") {
    // Some puzzles may require an object before the itme is clickable. Since we are passing
    // the puzzle name to the game object that has access to object list data handle that there.
    this.props.showPuzzle(this.props.puzzle, this.props.requiredItems);
  }
}

render() {
  // Is this where we should put in the scale factor? Need to think about how this works and maybe redesign    
  //let scaleFactor = this.props.isInfoMode ? .8 * this.props.scaleFactor: this.props.scaleFactor;
    let scaleFactor = 1;
    let style = {

      // Let's play around with the style that is applied to the div around the SVG and
      // to the SVG itself. Leave this commented stuff here until we get handle on what really works.
//     width: '10%',
//     height: '10%',
      zoom: scaleFactor,
      position: 'absolute',
      //background: '#222',
      top: this.props.top,
      left: this.props.left,
    };

    // This viewBox is part of the key to controlling the size of SVG code. I will leave here for now even though it does nothing.
    //var viewBox = [0, 0, 100, 100];
    // put this in the <svg> element when you are read to experiment viewBox={viewBox}

  return (
      <div className={this.props.name} style={style} >
        {!this.props.isHidden &&
          <svg onClick={() => this.handleClick()} >
            {this.props.svg}
          </svg>
        }
      </div>
    );
  }
}

export default ViewItem;
