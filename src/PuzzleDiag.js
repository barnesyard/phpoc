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

  onDocumentLoad ({total}) {
    this.setState ({total});
  }

  onPageLoad({ pageIndex, pageNumber }) {
    this.setState({ pageIndex, pageNumber });
  }


  render() {
   let style = {
     width: this.props.puzzDiagWidth + 'px',
     height: this.props.puzzDiagHeight,
     left: this.props.puzzDiagLeft,
   };

   let pdfStyle = {
     top: 30 + 'px',
     left: 30 + 'px',
     position: 'relative',
     background: 'lime',
     width: '55%',
   };

  // return (
  //     <div className="puzzleDiag" style={style}
  //       onClick={(event) => this.handleClick(event)}>
  //       <Pdf puzzDiagHeight = {this.props.puzzDiagHeight}/>
  //     </div>
  //   );
  // }

  let file = './../assets/Mute.pdf';
  let filewww = 'https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf';
  return (
      <div className="puzzleDiag" style={style}
        onClick={(event) => this.handleClick(event)}>
        <Button
          onClick={() => this.handlePrint()}
          modeBtnTop = {10}
          modeBtnLeft = {this.props.puzzDiagWidth - 110 }
          btnLabel = "P"
        />
        <Button
          onClick={() => this.handleDownload()}
          modeBtnTop = {10}
          modeBtnLeft = {this.props.puzzDiagWidth - 70 }
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
            onDocumentLoad={() => this.onDocumentLoad}
            onPageLoad={() => this.onPageLoad}
            error="Hey bitches, there was an error!"
            onDocumentError={({ message }) => alert('Error while loading document! ' + message)}
            scale={.8}
            />
          </div>
      </div>
    );
  }
}

export default PuzzleDiag;
