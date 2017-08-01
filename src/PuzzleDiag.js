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
    //TODO add to the list of open puzzles
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
        <AnswerForm submitGuess={guess => this.props.submitGuess(this.props.puzzle.title, guess)}/>
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

export default PuzzleDiag;

class AnswerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    // Pass the submission back up to the Puzzle diag object where we will check the answer
    // Assuming that the PuzzleDiag object will interact with the server code to get the list 
    // of the current puzzles and check for correct answers.
    this.props.submitGuess(this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} style={{top: '10px', left: '10px'}}>
        <input className="btnSubmit" type="submit" value="Submit" />
        <label className="txtInputLabel" >
          <input className="txtInput" type="text" value={this.state.value} onChange={this.handleChange} />
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
    let answerText = (this.props.puzzle.status === "solved") ? this.props.puzzle.answer : "Not yet solved";
  
    return (
      <div className="answerBox">
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
