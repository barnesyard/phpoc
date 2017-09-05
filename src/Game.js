import React, { Component } from 'react';
import './index.css';
import ViewPane from './ViewPane.js';
import ThingsPane from './ThingsPane.js';
import ListPane from './ListPane.js';
import Button from './Button.js';
import PuzzleDiag from './PuzzleDiag.js';
import { Database } from './Database.js';

// Data that will not be pulled from the database should be pulled into the UI here
import { viewData } from './viewdata.js';


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
      currentView: 0,
    };
  }

  updateThingsInventory(thingId) {
    let theThing = this.state.thingsInventory[thingId];
    theThing.selected = !theThing.selected;
    let things = this.state.thingsInventory;
    things[thingId] = theThing;
    this.setState({thingsInventory: things});
  }
  
  /////////////////////////////////////////////////////////////////////////////
  // The modes we are change to/from is "Information Mode" which shows the
  // list pane and "Full View Mode" which shows just the room.
  handleModeChange() {
    this.setState(oldState => ({ isInfoMode: !oldState.isInfoMode }));
  }

  /////////////////////////////////////////////////////////////////////////////
  // Check the list of current puzzles for the status to determine if and
  // how to render the RoomItem. Passing a puzzleId with the assumption 
  // that we will use IDs instead of titles.
  getRoomItemStatus(puzzleId) {
    let status = 'hidden'
    // Items not assigned to a puzzle should be visible.
    if (puzzleId === "") {
      status = 'visible';
    } else {
      //TODO: Use Puzzle ID, this code is written to use puzzle title
      let puzzle = this.state.puzzleList.find((element) => {
        if(element.title === puzzleId) return element;
      });
      if(puzzle) {
        status = puzzle.status;
      }
    }

    return status;
  }

  /////////////////////////////////////////////////////////////////////////////
  // When a room item is clicked and there is a puzzle in it we will show a
  // puzzle dialog with the PDF. Need to handle some state information too.
  roomItemClicked(puzzleId, requiredItems) {
    let puzzle = this.state.puzzleList.find((element) => {
      if(element.title === puzzleId) return element;
    });

    // For the first time a puzzle is opened show the list pane. Assuming it
    // is the first time a puzzle is open if there are 0 items in the list
    if( this.state.puzzleList.filter((p) => {return p.status !== 'unlocked'}).length === 0) {
      // only do this if it is not already open
      if(!this.state.isInfoMode) {
        this.handleModeChange();
      }
    }

    if(puzzle) {
      if(puzzle.status === 'unlocked') this.db.setPuzzleStatusOpen(puzzle.puzzleId);
      this.showPuzzle(puzzle.puzzleId);
    }
  }
  

  /////////////////////////////////////////////////////////////////////////////
  // This method will open the puzzle dialog when clicked on in the puzzle list.
  // This is not needed after switching to use puzzle IDs.
  showPuzzleFromList(puzzleId) {
    let puzzle = this.state.puzzleList.find((element) => {
      if(element.title === puzzleId) return element;
    });

    if(puzzle) {
      this.showPuzzle(puzzle.puzzleId);
    }
    
  }

  /////////////////////////////////////////////////////////////////////////////
  // This method will open the puzzle dialog when exposed from a room or 
  // from the puzzle list.
  showPuzzle(puzzleId) {
    let puzzle = this.db.getPuzzleInfo(puzzleId)
    if (puzzle) {
      this.setState( { renderedPuzzle: puzzle } );
    }    
  }

  submitGuess(puzzleId, guess) {
    // TO DO: verify that it is possible to submit (maybe gray out textbox)

    // TODO: stop using the puzzle title 
    // let puzzle = this.state.puzzleList.find((element) => {
    //   if(element.title === puzzleId) return element;
    // });

    // Update the puzzle based on the result of the guess
    let renderPuzzle = this.db.submitGuess(puzzleId, guess);
    this.setState({puzzleList: this.db.getUnlockedPuzzles(),})
    this.setState( { renderedPuzzle: renderPuzzle });
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

  /////////////////////////////////////////////////////////////////////////////
  // This is to allow for users to click outside of puzzle dialog to close it.
  handleGameClick() {
    // as of now we will only dismiss the puzzle dialog but maybe we need to do something else someday
    this.closePuzzleDialog();
  }

  closePuzzleDialog() {
    if (this.state.renderedPuzzle) { // Necessary because the click from opening the puzzle bubbles up
      this.setState( { renderedPuzzle: null } );
    }
  }

  handleMoveViewRight () {
    let currentView = this.state.currentView;
    let newView = viewData.length === currentView + 1 ? 0 : currentView + 1; 
    this.setState({currentView: newView})
  }

  handleMoveViewLeft () {
    let currentView = this.state.currentView;
    let newView =  0 === currentView ? viewData.length - 1 : currentView - 1 ; 
    this.setState({currentView: newView})
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

    let listPaneHeight = gameHeight;
    let listPaneWidth = .2 * gameWidth;
    let listPaneLeft = viewWidth;

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
        viewData = {viewData[this.state.currentView]}
        viewWidth = {gameWidth}
        viewHeight = {gameHeight}
        getRoomItemStatus ={(puzzleId) => this.getRoomItemStatus(puzzleId)}
        roomItemClicked ={(puzzleId, requiredItems) => this.roomItemClicked(puzzleId, requiredItems)}
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
          puzzleList = {this.state.puzzleList.filter((p) => {return p.status !== 'unlocked'})}
          showPuzzle = {(puzzleId) => this.showPuzzleFromList(puzzleId)}
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
          close = {() => this.closePuzzleDialog()}
          puzzle = {this.state.renderedPuzzle}
        />
      }
      </div>
    );
  }
}

export default Game;
