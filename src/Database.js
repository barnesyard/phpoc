// In general, the "RealDatabase" class will look similar to this. It will still
// keep track of the puzzleData, but it will also make web calls to the .net code
// on the server. Permissions, rate-limiting, etc will happen there.
// The real impl will also need a way to save & load state from the server,
// a way to sync between users, and a way to push things from the hunt organizers
// to the users (it's likely the last two will share a single implementation).

import { puzzleData } from './puzzledata.js';
import { viewData } from './viewdata.js';
import { thingData } from './thingData.js';
import { ArcData } from './arcdata.js';

class FakeDatabase {
  constructor() {
    // The arcData comes in as a class to handle importing of images locally
    this.arcData = new ArcData().getArcData();
    this.puzzleData = puzzleData;
    this.viewData = viewData;
    this.thingData = thingData;
    this.arData = []
  }

  getThingsInventory() {
    return this.thingData;
  }

  getViewData() {
    return this.viewData;
  }

  getArcData() {
    return this.arcData;
  }

  // TODO: have this set the initial state of the puzzle inventory
  getUnlockedPuzzles() {
    let puzzles = Object.values(this.puzzleData);

    // TODO: is "locked" correct?
    return puzzles.filter(puzzle => puzzle.status !== "locked");
  }

  // TODO: deal with selectedItems
  showPuzzleIfAllowed(puzzleId, selectedItems) {
    let puzzle = this.puzzleData[puzzleId];
    if (puzzle && puzzle.status !== "locked") {
      return puzzle;
    } else {
      return null;
    }
  }

  submitGuess(puzzleId, guess) {
    let puzzle = this.puzzleData[puzzleId];
    if (puzzle.answer === guess) {
      puzzle.status = "solved";
    }
    puzzle.guesses.push(guess);

    // returns updated puzzle
    return puzzle;
  }
}

export { FakeDatabase as Database };
