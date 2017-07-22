import React, { Component } from 'react';
import './index.css';
import Pdf from './Pdf.js'
import Viewer from './Pdf.js'

class PuzzleDiag extends Component {
  handleClick(e) {
    console.log("No clicks allowed");
    e.stopPropagation();
  }

  render() {
   let style = {
     width: this.props.puzzDiagWidth + 'px',
     height: '100%',
     left: this.props.puzzDiagLeft,
   };

  return (
      <div className="puzzleDiag" style={style}
        onClick={(event) => this.handleClick(event)}
      >
        <Pdf/>
      </div>
    );
  }
}

export default PuzzleDiag;
