import React, { Component } from 'react';
import './index.css';
import View from './View.js';
import InfoPane from './InfoPane.js';
import ListPane from './ListPane.js';
import Button from './Button.js';

// The Game class contains all the UI the users will interact with. The view and the list pane and 
// the info pane will all reside in the Game Div. The intent here it to have this div retain the 
// 16:9 ratio.
class Game extends Component {

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
    let viewWidth, viewHeight;
    if (this.state.isInfoMode) {
      viewWidth = .8 * gameWidth;
      viewHeight = .8 * gameHeight;
    } else {
      viewWidth = gameWidth;
      viewHeight = gameHeight;
    }

    let listPaneWidth, listPaneHeight, listPaneLeft;
    listPaneHeight = gameHeight;
    listPaneWidth = .2 * gameWidth;
    listPaneLeft = viewWidth;

    let infoPaneWidth, infoPaneHeight, infoPaneTop;
    infoPaneHeight = .2 * viewHeight;
    infoPaneWidth = viewWidth;
    infoPaneTop = viewHeight;

    let style = {
      width: gameWidth + 'px',
      height: gameHeight + 'px',
      postion: 'relative',
    };

  return (
      <div className="game" style={style}>
      <View
        viewWidth = {gameWidth}
        viewHeight = {gameHeight}
      />
      <Button
        onClick={() => this.handleModeChange()}
        modeBtnTop = {viewHeight - 30}
        modeBtnLeft = {viewWidth -30 }
      />
      { this.state.isInfoMode &&
        <ListPane
          listPaneHeight = {listPaneHeight}
          listPaneWidth = {listPaneWidth}
          listPaneLeft = {listPaneLeft}
        />
      }
      { this.state.isInfoMode &&
        <InfoPane
          infoPaneHeight = {infoPaneHeight}
          infoPaneWidth = {infoPaneWidth}
          infoPaneTop = {infoPaneTop}
        />
      }
      </div>
    );
  }
}

export default Game;
