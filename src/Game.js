import React, { Component } from 'react';
import './index.css';
import View from './View.js';
import InfoPane from './InfoPane.js';
import ListPane from './ListPane.js';
import Button from './Button.js';
import PuzzleDiag from './PuzzleDiag.js';

// The Game class contains all the UI the users will interact with. The view and the list pane and 
// the info pane will all reside in the Game Div. The intent here it to have this div retain the 
// 16:9 ratio.
class Game extends Component {

  constructor(props) {
    super(props);

    if ((this.props.appWidth / this.props.appHeight) > 16 / 9 ) {
      this.origWidth = this.props.appHeight / 9 * 16;
      this.origHeight = this.props.appHeight;
    } else {
      this.origHeight = this.props.appWidth / 16 * 9;
      this.origWidth = this.props.appWidth;
    }

    this.state = {
      isInfoMode: false,
      renderPuzzle: false,
      origWidth: this.props.appWidth,
      origHeight: this.props.appHeight,
    };
  }

  handleModeChange() {
    this.setState({
      isInfoMode: !this.state.isInfoMode,
    });
  }

  showPuzzle(puzzle) {
    //alert("clicked from game!");
    this.setState({
      renderPuzzle: true,
    });
    this.puzzle = puzzle;
  }

  handleGameClick() {
    //alert("game clicked!");
    //check to see if the mouse cursor is outside the box.
    if (this.state.renderPuzzle) {
      this.setState({
        renderPuzzle: false,
      })
    }
  }

  handleMoveViewRight () {
    //do nothing right now
  }

  handleMoveViewLeft () {
    //do nothing right now
    console.log("The scale factor" + this.scaleFactor)
  }

  render() {
    let gameHeight, gameWidth, scaleFactor;
    // Handle resizing so that the game div stays in a 16:9 ratio
    if ((this.props.appWidth / this.props.appHeight) > 16 / 9 ) {
      gameWidth = this.props.appHeight / 9 * 16;
      gameHeight = this.props.appHeight;
    } else {
      gameHeight = this.props.appWidth / 16 * 9;
      gameWidth = this.props.appWidth;
    }
    scaleFactor = gameHeight / this.origHeight;

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
    infoPaneHeight = .2 * gameHeight;
    infoPaneWidth = viewWidth;
    infoPaneTop = viewHeight;

    let puzzDiagLeft, puzzDiagWidth;
      puzzDiagLeft = .1 * gameWidth;
      puzzDiagWidth = .8 * gameWidth; 

    let style = {
      width: gameWidth + 'px',
      height: gameHeight + 'px',
      postion: 'relative',
    };

  return (
      <div className="game" 
        onClick={() => this.handleGameClick()}
        style={style}>
      <View
        viewWidth = {gameWidth}
        viewHeight = {gameHeight}
        showPuzzle = {() => this.showPuzzle()}
        isInfoMode = {this.state.isInfoMode}
        scaleFactor = {scaleFactor}
      />
      <Button
        onClick={() => this.handleModeChange()}
        modeBtnTop = {viewHeight - 70}
        modeBtnLeft = {viewWidth -70 }
        btnLabel = "i"
      />
      <Button
        onClick={() => this.handleMoveViewRight()}
        modeBtnTop = {viewHeight / 2}
        modeBtnLeft = {viewWidth -40 }
        btnLabel = ">"
      />
      <Button
        onClick={() => this.handleMoveViewLeft()}
        modeBtnTop = {viewHeight / 2}
        modeBtnLeft = { 10 }
        btnLabel = "<"
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
      { this.state.renderPuzzle &&
        <PuzzleDiag
          puzzDiagLeft = {puzzDiagLeft}
          puzzDiagWidth = {puzzDiagWidth}
          puzzDiagHeight = {gameHeight}
          puzzle = {this.puzzle}
        />
      }
      </div>
    );
  }
}

export default Game;
