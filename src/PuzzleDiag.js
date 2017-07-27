import React, { Component } from 'react';
import './index.css';
import Button from './Button.js'
import ReactPDF from 'react-pdf'
//import ReactPDF from 'react-pdf/build/entry.webpack'

class PuzzleDiag extends Component {
  
    state = {
    file: './sample.pdf',
    pageIndex: null,
    pageNumber: null,
    total: null,
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

  onDocumentLoad (total) {
    console.log("The PDF Loaded")
    this.setState ({total: total});
  }

  onPageLoad({ pageIndex, pageNumber }) {
    this.setState({ pageIndex, pageNumber });
  }


  render() {

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

  let file = './../assets/Mute.pdf';
  let filewww = 'https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf';
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
            file={filewww}
            onDocumentLoad={({total}) => this.onDocumentLoad(total)}
            onPageLoad={() => this.onPageLoad}
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
