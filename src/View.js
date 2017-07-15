import React, { Component } from 'react';
import './index.css';
import Button from './Button.js';

class View extends Component {

  constructor(props) {
    super(props);
    this.state = {
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
    viewWidth = this.props.gameWidth - 10;
    viewHeight = this.props.gameHeight - 10;

    // In info mode we will reduce the view to show a list pane on the right 
    // and an info pane along the bottom of the screen
    if (this.state.isInfoMode) {
      viewWidth = (.8 * viewWidth);
      viewHeight = (.8 * viewHeight);
    }

   let style = {
     width: viewWidth + 'px',
     height: viewHeight + 'px',
     transform: 'translate3d(5px,5px,0)',
   };

  return (
      <div className="view" style={style}>
        <Button
          onClick={() => this.handleModeChange()}
        />
      </div>
    );
  }
}

export default View;
