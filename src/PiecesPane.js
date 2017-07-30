import React, { Component } from 'react';
import './index.css';

class PiecesPane extends Component {
  
  render() {
    let style = {
     width: this.props.infoPaneWidth + 'px',
     height: this.props.infoPaneHeight + 'px',
     top: this.props.infoPaneTop + '0px',
     left: '0px',
    };

    return (
      <div className="piecesPane" style={style}>
      </div>
    );
  }
}

export default PiecesPane;
