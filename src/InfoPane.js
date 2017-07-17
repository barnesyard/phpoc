import React, { Component } from 'react';
import './index.css';

class InfoPane extends Component {
  
  render() {
    let infoPaneHeight, infoPaneWidth, left;
    // I am subtracting 10 pixels and moving it down and over 5 pixels
    // This is temporary so I can see the "Game" object behind the View
    //infoPaneWidth = .2 * this.props.gameWidth - 10;
    //infoPaneHeight = this.props.gameHeight - 10;
    infoPaneWidth = this.props.gameWidth;
    infoPaneHeight = this.props.gameHeight;

    // Set the left side of the info pane
    left = .8 * this.props.gameWidth;

    let style = {
     width: infoPaneWidth + 'px',
     height: infoPaneHeight + 'px',
     top: '2px',
     right: '2px',
     position: 'relative',
    };

    return (
      <div className="infoPane">
      info pane! <br/>
      width: {infoPaneWidth} <br/>
      height: {infoPaneHeight}
      </div>
    );
  }
}

export default InfoPane;
