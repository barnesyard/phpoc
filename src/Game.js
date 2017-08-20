import React, { Component } from 'react';
import './index.css';
import ViewPane from './ViewPane.js';
import ThingsPane from './ThingsPane.js';
import ListPane from './ListPane.js';
import Button from './Button.js';
import PuzzleDiag from './PuzzleDiag.js';
import { Database } from './Database.js';

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

    this.db = new Database();
    let thingsInventory = this.db.getThingsInventory();

    this.state = {
      isInfoMode: false,
      renderedPuzzle: null,
      origWidth: this.props.appWidth,
      origHeight: this.props.appHeight,
      thingsInventory: thingsInventory,
      puzzleList: this.db.getUnlockedPuzzles(),
    };
  }

  updateThingsInventory(thingId) {
    let theThing = this.state.thingsInventory[thingId];
    theThing.selected = !theThing.selected;
    let things = this.state.thingsInventory;
    things[thingId] = theThing;
    this.setState({thingsInventory: things});
  }
  
  handleModeChange() {
    this.setState(oldState => ({ isInfoMode: !oldState.isInfoMode }));
  }

  // When a room item is clicked and there is a puzzle in it we will show a
  // puzzle dialog with the PDF. We will also show the puzzle dialog when
  // the puzzle is clicked in the list of puzzles.
  showPuzzleIfAllowed(puzzleId, selectedItems) {
    let puzzle = this.db.showPuzzleIfAllowed(puzzleId, selectedItems);
    console.log(puzzle);
    if (puzzle) {
      console.log('rendering it');
      this.setState( { renderedPuzzle: puzzle } );
    }
  }

  submitGuess(puzzleId, guess) {
    // TO DO: verify that it is possible to submit (maybe gray out textbox)

    // Update the puzzle based on the result of the guess
    let puzzle = this.db.submitGuess(puzzleId, guess);
    this.setState( { renderedPuzzle: puzzle });
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

  // Clicking on the game obj will dismiss puzzle dialog. Maybe make it so the "X" must be clicked?
  handleGameClick() {
    if (this.state.renderedPuzzle) { // Necessary because the click from opening the puzzle bubbles up
      this.setState( { renderedPuzzle: null } );
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
        viewData = {this.db.getViewData()}
        viewWidth = {gameWidth}
        viewHeight = {gameHeight}
        showPuzzleIfAllowed ={(puzzleId) => this.showPuzzleIfAllowed(puzzleId /* FIXME PASS ITEMS */)}
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
          arcData = {this.db.getArcData()}
          listPaneHeight = {listPaneHeight}
          listPaneWidth = {listPaneWidth}
          listPaneLeft = {listPaneLeft}
          puzzleList = {this.state.puzzleList}
        />
      }
      { this.state.isInfoMode &&
        <ThingsPane
          infoPaneHeight = {infoPaneHeight}
          infoPaneWidth = {infoPaneWidth}
          infoPaneTop = {infoPaneTop}
          thingsInventory = {this.state.thingsInventory}
          updateThingsInventory = {(thingId) => this.updateThingsInventory(thingId)}
        />
      }
      { this.state.renderedPuzzle &&
        <PuzzleDiag
          puzzDiagLeft = {puzzDiagLeft}
          puzzDiagWidth = {puzzDiagWidth}
          puzzDiagHeight = {gameHeight}
          submitGuess = {(puzzleId, guess) => this.submitGuess(puzzleId, guess)}
          puzzle = {this.state.renderedPuzzle}
        />
      }
      </div>
    );
  }
}

export default Game;
