import React, { Component } from 'react';
import './index.css';
import Button from './Button.js'
import ReactPDF from 'react-pdf'

class PuzzleDiag extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      pageIndex: null,
      pageNumber: null,
      total: null,
      stuff: null,
    };
  }

  handleClick(e) {
    e.stopPropagation();
  }

  handleOpenPdf() {
    window.open(this.props.puzzle.pdf);
  }

  handleClose() {
    this.props.close();
  }

  onPdfDocumentLoad (total) {
    console.log("The PDF Loaded")
    this.setState ({total: total});
  }

  onPdfPageLoad({ pageIndex, pageNumber }) {
    this.setState({ pageIndex, pageNumber });
  }

  render() {
    let style = {
      width: this.props.puzzDiagWidth + 'px',
      height: this.props.puzzDiagHeight + 'px',
      left: this.props.puzzDiagLeft,
    };

    // we want the PDF to be 0.8* height of the puzzle dialog
    //assuming the PDF pages are all 8.5x11 we can calculate the width we want
    let pdfWidth = ( 0.8 * this.props.puzzDiagHeight * 8.5 / 11); 
    let pdfStyle = {
      width: pdfWidth + 'px',
    };

    return (
      <div className="puzzleDiag" style={style}
        onClick={(event) => this.handleClick(event)}>
        <div className="puzzleTitle">{this.props.puzzle.title}</div>
        <AnswerForm submitGuess={guess => this.props.submitGuess(this.props.puzzle.puzzleId, guess)}/>
        <PuzzleResponse puzzle={this.props.puzzle}/>
        <PuzzleAnswer puzzle={this.props.puzzle}/>
        <SubmittedGuesses guesses={this.props.puzzle.guesses}/>
        <Button key="openPdfButton"
          onClick={() => this.handleOpenPdf()}
          modeBtnTop={10}
          modeBtnLeft={this.props.puzzDiagWidth - 100 }
          btnLabel="^"
        />
        <Button key="closeButton"
          onClick={() => this.handleClose()}
          modeBtnTop={10}
          modeBtnLeft={this.props.puzzDiagWidth - 40 }
          btnLabel="X"
        />
        <div className="pdfViewer" style={pdfStyle} onClick={() => this.handleOpenPdf()}>
          <ReactPDF
            file={this.props.puzzle.pdf}
            onDocumentLoad={({total}) => this.onPdfDocumentLoad(total)}
            onPageLoad={() => this.onPdfPageLoad}
            error="Hey bitches, there was an error!"
            onDocumentError={({ message }) => alert('Error while loading document! ' + message)}
            width = {pdfWidth}
          />
          Total Pages: {this.state.total}
        </div>
      </div>
    );
  }
}

class AnswerForm extends React.Component {

  handleSubmit(event) {
    event.preventDefault();

    const input = document.getElementById("guessInput");
    this.props.submitGuess(input.value);
    input.value = "";
  }

  render() {
    return (
      <form className="answerForm" onSubmit={e => this.handleSubmit(e)}>
        <input className="btnSubmit" type="submit" value="Submit" />
        <label className="txtInputLabel" >
          <input id="guessInput" className="txtInput" type="text" placeholder="Submit answer here"/>
        </label>
      </form>
    );
  }
}

class SubmittedGuesses extends React.Component {
  render() {
    return (
      <div className="guesses">
        <div className="guessesLabel">
          Submission History
        </div>
        <div className="guessesList">
          <ul>
            {this.props.guesses.map(g => <li key={g}>{g}</li>)}
          </ul>
        </div>
      </div>
    );
  }
}

class PuzzleAnswer extends React.Component {
  render() {
    let answerText =  this.props.puzzle.status === "complete" ? this.props.puzzle.answer : "???";
    let visibility = answerText === "???" ? 'hidden' : 'visible';
    let style = {
      visibility: visibility,
     };
  
    return (
      <div className={`answerBox ${this.props.puzzle.status}`} style={style}>
        <div className="answerBoxLabel">
          Answer
          <div className="answerBoxText">
            {answerText}
          </div>
        </div>
      </div>
    
    );
  }
}

class PuzzleResponse extends React.Component {
  render() {
    let repsonseText =  this.props.puzzle.status === "complete" ? "Correct!" : "That is not correct.";
    let visibility = this.props.puzzle.guesses.length > 0 ? 'visible' : 'hidden';
    let style = {
      visibility: visibility,
     };
   
    return (
      <div className={`responseBox ${this.props.puzzle.status}`} style={style}>
        <div className="responseBoxLabel">
          Response
          <div className="responseBoxText">
            {repsonseText}
          </div>
        </div>
      </div>
    );
  }
}

export default PuzzleDiag;
