import React, { Component } from 'react';
import './index.css';

class InfoPane extends Component {
  
  render() {
    let style = {
     width: this.props.infoPaneWidth + 'px',
     height: this.props.infoPaneHeight + 'px',
     top: this.props.infoPaneTop + '0px',
     left: '0px',
     position: 'absolute',
    };

    return (
      <div className="infoPane" style={style}>
      </div>
    );
  }
}

export default InfoPane;
