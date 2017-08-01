import React, { Component } from 'react';
import './index.css';
import ViewPane from './ViewPane.js';
import PiecesPane from './PiecesPane.js';
import ListPane from './ListPane.js';
import Button from './Button.js';
import PuzzleDiag from './PuzzleDiag.js';
import { puzzleData } from './puzzledata.js';

// The Game class contains all the UI the users will interact with. The view and the list pane and 
// the info pane will all reside in the Game Div. The intent here it to have this div retain the 
// 16:9 ratio.
class Game extends Component {

  constructor(props) {
    super(props);

    //store the original height and width of the window to create a scaling factor
    if ((this.props.appWidth / this.props.appHeight) > 16 / 9 ) {
      this.origWidth = this.props.appHeight / 9 * 16;
      this.origHeight = this.props.appHeight;
    } else {
      this.origHeight = this.props.appWidth / 16 * 9;
      this.origWidth = this.props.appWidth;
    }

    this.state = {
      isInfoMode: false,
      renderedPuzzle: null,
      origWidth: this.props.appWidth,
      origHeight: this.props.appHeight,
      puzzles: puzzleData
    };
  }
  
  handleModeChange() {
    this.setState({
      isInfoMode: !this.state.isInfoMode,
    });
  }

  // When a room item is click and there is a puzzle in it we will show a puzzle dialog with the PDF
  showPuzzle(puzzle, requiredItems) {
    this.updateActivePieces(requiredItems);
    if (this.arraysAreEqual(requiredItems.sort(), this.pieces.sort())) {
      this.setState({
        renderedPuzzle: this.state.puzzles[puzzle],
      });
    }
  }

  submitGuess(puzzleId, submission) {
    // Will need to call PH code to see if it is possible to make a submission
    // TO DO: verify that it is possible to submit (maybe gray out textbox)

    // This will be a call to the PH code but for now it will verify against the local data
    // The call to the PH code will update the status of the puzzle

    let puzzle = this.state.puzzles[puzzleId];
    if(submission === puzzle.answer) {
      puzzle.status = "solved";
    }
    puzzle.guesses.push(submission);

    this.setState(oldState => ({ puzzles: { ...this.oldState.puzzles, [puzzleId]: puzzle }}));
  }

  arraysAreEqual(x, y) {
  if (x.length !== y.length) {
    return false;
  }
  for (let i = 0; i < x.length; i++) {
    if (x[i] !== y[i]) {
      return false;
    }
  }
    return true;
  }

  // This is a temp method that will be replaced by a call from a Piece obj in the PiecesPane
  updateActivePieces(pieces) {
    console.log("setting active pieces to :" + pieces);
    this.pieces = pieces;
  }

  // Clicking on the game obj will dismiss puzzle dialog. Maybe make it so the "X" must be clicked?
  handleGameClick() {
    if (this.state.renderedPuzzle) {
      this.setState({
        renderedPuzzle: null,
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
      <ViewPane
        viewWidth = {gameWidth}
        viewHeight = {gameHeight}
        showPuzzle = {(puzzle, requiredItems) => this.showPuzzle(puzzle, requiredItems)}
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
        <PiecesPane
          infoPaneHeight = {infoPaneHeight}
          infoPaneWidth = {infoPaneWidth}
          infoPaneTop = {infoPaneTop}
        />
      }
      { this.state.renderedPuzzle &&
        <PuzzleDiag
          puzzDiagLeft = {puzzDiagLeft}
          puzzDiagWidth = {puzzDiagWidth}
          puzzDiagHeight = {gameHeight}
          submitGuess = {(puzzleId, submission) => this.submitGuess(puzzleId, submission)}
          puzzle = {this.state.renderedPuzzle}
        />
      }
      </div>
    );
  }
}

export default Game;
