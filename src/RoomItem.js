import React, { Component } from 'react';
import './index.css';

class RoomItem extends Component {

handleClick() {
  if (this.props.puzzle != "") {
    this.props.showPuzzle(this.props.puzzle);
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

    let showItem = true;
    if (this.props.isHidden == "true") {
      showItem = false;
      console.log("show item is false");
    }

    // This viewBox is part of the key to controlling the size of SVG code. I will leave here for now even though it does nothing.
    var viewBox = [0, 0, 50, 50];
    
  return (
      <div className={this.props.name} style={style} >
        {!this.props.isHidden &&
          <svg onClick={() => this.handleClick()} viewbox={viewBox} >
            {this.props.svg}
          </svg>
        }
      </div>
    );
  }
}

export default RoomItem;
