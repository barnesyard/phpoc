import azothPdf from './Puzzles/Azoth.pdf';
import mutePdf from './Puzzles/Mute.pdf';
import oncePdf from './Puzzles/OnceUponATime.pdf';
import pdPdf from './Puzzles/PD.pdf';

class PuzzleData {
  constructor() {
    this.puzzleData = {
      "Mute": {
        "title": "Mute",
        "pdf": mutePdf,
        "answer": "answer",
        "arc": "emc2",
        "guesses": [],
        "status": "open",
      },
      "Printer's Devil": {
        "title": "Printer's Devil",
        "pdf": pdPdf,
        "answer": "answer",
        "arc": "eye",
        "guesses": [],
        "status": "open",
      },
      "Azoth The Avenger Is a Friend of Mine": {
        "title": "Azoth The Avenger Is a Friend of Mine",
        "pdf": azothPdf,
        "answer": "answer",
        "arc": "hourglass",
        "guesses": [],
        "status": "open",
      },
      "Once Upon A Time": {
        "title": "Once Upon A Time",
        "pdf": oncePdf,
        "answer": "answer",
        "arc": "window",
        "guesses": [],
        "status": "open",
      },
      "Test Monkey": {
        "title": "Test Monkey",
        "pdf": "https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf",
        "answer": "answer",
        "arc": "funnel",
        "guesses": [],
        "status": "open",
      },
    };
  }

  getPuzzleData() {
    return this.puzzleData;
  }

}
export { PuzzleData };
