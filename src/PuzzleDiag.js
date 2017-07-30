import React, { Component } from 'react';
import './index.css';
import Button from './Button.js'
import ReactPDF from 'react-pdf'
import { puzzledata } from './puzzledata.js';

class PuzzleDiag extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      puzzleData: [],
      pageIndex: null,
      pageNumber: null,
      total: null,
      stuff: null,
      puzzle: null,
    };

    // The title of the puzzle (used ID?) is passed to this PuzzleDiag component. I am assuming that during the constructor
    // we can call PH server code here to get PDF path, previous answer submissions, and possibly the lock state of the submission
    // because there is a mechanism to block submissions if it is done too much.
    puzzledata.forEach((puzzle) => {
      if (puzzle.title === this.props.puzzle) {
        this.puzzle = puzzle;
        this.setState({puzzle: puzzle});
      }
    })

  }

    handleClick(e) {
    e.stopPropagation();
  }

  handlePrint() {
    // Todo: print the PDF
  }

  handleDownload() {
    // Todo: download the PDF
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

  submitGuess(submission) {
    // Will need to call PH code to see if it is possible to make a submission
    // TO DO: verify that it is possible to submit (maybe gray out textbox)

    // This will be a call to the PH code but for now it will verify against the local data
    // The call to the PH code will update the status of the puzzle
    if(submission === this.puzzle.answer) {
      // TODO: for the prototype update the status 
      this.puzzle.status = "solved";
    }

    // TODO: figure out why this is not causing the list of submissions to render properly. When this
    // comment was written the submissions list would not update but had been tested with harded coded
    // array.
    this.puzzle.guesses.push(submission);
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
        <AnswerForm submitGuess={(submission) => this.submitGuess(submission)}/>
        <PuzzleAnswer puzzle={this.puzzle}/>
        <SubmittedGuesses submissions={this.puzzle.guesses}/>
        <Button key="printButton"
          onClick={() => this.handlePrint()}
          modeBtnTop={10}
          modeBtnLeft={this.props.puzzDiagWidth - 150 }
          btnLabel="P"
        />
        <Button key="downloadButton"
          onClick={() => this.handleDownload()}
          modeBtnTop={10}
          modeBtnLeft={this.props.puzzDiagWidth - 100 }
          btnLabel="D"
        />
        <Button key="closeButton"
          onClick={() => this.handleClose()}
          modeBtnTop={10}
          modeBtnLeft={this.props.puzzDiagWidth - 40 }
          btnLabel="->"
        />
        <div className="pdfViewer" style={pdfStyle}>
          <ReactPDF
            file={this.puzzle.pdf}
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
    this.state = {value: 'Answer'};

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
  constructor(props) {
    super(props);
    this.state = {submissions: this.props.submissions};
  }

  render() {
    console.log("The list of submissions passed as prop: " + this.props.submissions);
    // When I try to use the state if doesn't work. Need to debug.
    //let submissionList = this.state.submissions.map((submission) => <li>{submission}</li>);
    let submissionList = this.props.submissions.map((submission) => <li>{submission}</li>);
  
    return (
      <div className="submissions">
        <div className="submissionsLabel">
          Submission History
        </div>
        <div className="submissionsList">
          <ul>{submissionList}</ul>
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