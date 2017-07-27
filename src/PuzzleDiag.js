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
    };
  }
  
  componentDidMount() {
    this.setState({puzzleData: puzzledata});
  }

    handleClick(e) {
    console.log("No clicks allowed");
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


  render() {

    //let pdfFile = 'https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf';
    let pdfFile;
    //We were passed the puzzle title from the roomItem so use that to get the puzzle info
    this.state.puzzleData.forEach((puzzle) => {
        console.log("Checking for matching puzzle " + puzzle.title + "to match this: " + this.props.puzzle);
        if (puzzle.title === this.props.puzzle) {
          pdfFile = puzzle.pdf;
        }
    })


    let vertPdfScale = .8; // we want the PDF to be 0.8* height of the puzzle dialog
    let pdfWidth = ((8.5 * vertPdfScale * this.props.puzzDiagHeight ) / 11); //assuming the PDF pages are all 8.5x11
    let style = {
     width: this.props.puzzDiagWidth + 'px',
     height: this.props.puzzDiagHeight,
     left: this.props.puzzDiagLeft,
   };

   let pdfStyle = {
     top: 50 + 'px',
     position: 'relative',
     background: 'transparent',
     width: pdfWidth + 'px',
     float: 'right',
     right: 60 + 'px'
   };

  return (
      <div className="puzzleDiag" style={style}
        onClick={(event) => this.handleClick(event)}>
        <Button
          onClick={() => this.handlePrint()}
          modeBtnTop = {10}
          modeBtnLeft = {this.props.puzzDiagWidth - 150 }
          btnLabel = "P"
        />
        <Button
          onClick={() => this.handleDownload()}
          modeBtnTop = {10}
          modeBtnLeft = {this.props.puzzDiagWidth - 100 }
          btnLabel = "D"
        />
        <Button
          onClick={() => this.handleClose()}
          modeBtnTop = {10}
          modeBtnLeft = {this.props.puzzDiagWidth - 40 }
          btnLabel = "->"
        />
        <div className="pdf-viewer" style={pdfStyle}>
          <ReactPDF
            file={pdfFile}
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
