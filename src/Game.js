import React, { Component } from 'react';
import './index.css';
import View from './View.js';


// The Game class contains all the UI the users will interact with. The view and the list pane and 
// the info pane will all reside in the Game Div. The intent here it to have this div retain the 
// 16:9 ratio.
class Game extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    let gameHeight, gameWidth;
    // Handle resizing so that the view window stays in a 16:9 ratio
    if ((this.props.appWidth / this.props.appHeight) > 16 / 9 ) {
      gameWidth = this.props.appHeight / 9 * 16;
      gameHeight = this.props.appHeight;
    } else {
      gameHeight = this.props.appWidth / 16 * 9;
      gameWidth = this.props.appWidth;
    }

   let style = {
    width: gameWidth + 'px',
    height: gameHeight + 'px',
    //transform: 'translate3d(5px,5px,0)',
   };

  return (
      <div className="game" style={style}>
      <View
        gameWidth = {gameWidth}
        gameHeight = {gameHeight}
      />
      </div>
    );
  }
}

export default Game;
