import React, { Component } from 'react';
import './index.css';
import Button from './Button.js';

class View extends Component {

  constructor(props) {
    super(props);
    this.state = {
      // This should be maintained in the Game object, move it
      isInfoMode: true,
    };
  }

  handleModeChange() {
    this.setState({
      isInfoMode: !this.state.isInfoMode,
    });
  }

  render() {
    let viewHeight, viewWidth;
    // I am subtracting 10 pixels and moving it down and over 5 pixels
    // This is temporary so I can see the "Game" object behind the View
    viewWidth = this.props.gameWidth;
    viewHeight = this.props.gameHeight;

    // In info mode we will reduce the view to show a list pane on the right 
    // and an info pane along the bottom of the screen
    if (this.state.isInfoMode) {
      viewWidth = (.8 * viewWidth);
      viewHeight = (.8 * viewHeight);
    }

   let style = {
     width: viewWidth + 'px',
     height: viewHeight + 'px',
     position: 'relative',
   };

  return (
      <div className="view" style={style}>
        <Button
          onClick={() => this.handleModeChange()}
        /> <br/>
        width: {viewWidth} <br/>
        height: {viewHeight} <br/>
        game width: {this.props.gameWidth} <br/>
        game height: {this.props.gameHeight}
      </div>
    );
  }
}

export default View;
