import React, { Component } from 'react';
import './index.css';

class PuzzleDiag extends Component {

  render() {
   let style = {
     width: this.props.puzzDiagWidth + 'px',
     height: '100%',
     left: this.props.puzzDiagLeft,
   };

  return (
      <div className="puzzleDiag" style={style}>
      </div>
    );
  }
}

export default PuzzleDiag;
