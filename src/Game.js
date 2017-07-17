import React, { Component } from 'react';
import './index.css';
import View from './View.js';
import InfoPane from './InfoPane.js';
import ListPane from './ListPane.js';

// The Game class contains all the UI the users will interact with. The view and the list pane and 
// the info pane will all reside in the Game Div. The intent here it to have this div retain the 
// 16:9 ratio.
class Game extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    let gameHeight, gameWidth;
    // Handle resizing so that the game div stays in a 16:9 ratio
    if ((this.props.appWidth / this.props.appHeight) > 16 / 9 ) {
      gameWidth = this.props.appHeight / 9 * 16;
      gameHeight = this.props.appHeight;
    } else {
      gameHeight = this.props.appWidth / 16 * 9;
      gameWidth = this.props.appWidth;
    }

    // Let the Game object manage the size of the divs that are its children
    let infoPaneWidth, infoPaneHeight;
    infoPaneHeight = gameHeight;
    infoPaneWidth = .2 * gameWidth;

    let style = {
      width: gameWidth + 'px',
      height: gameHeight + 'px',
      postion: 'relative',
    };

  return (
      <div className="game" style={style}>
      <View
        gameWidth = {gameWidth}
        gameHeight = {gameHeight}
      />
      <InfoPane
        infoPaneHeight = {infoPaneHeight}
        infoPaneWidth = {infoPaneWidth}
      />
      </div>
    );
  }
}

export default Game;
