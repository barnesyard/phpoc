import React, { Component } from 'react';
import './index.css';

class InfoPane extends Component {
  
  render() {

    let style = {
     width: this.props.infoPaneWidth + 'px',
     height: this.props.infoPaneHeight + 'px',
     top: '0px',
     right: '0px',
     float: 'right',
     position: 'absolute',
    };

    return (
      <div className="infoPane" style={style}>
      info pane! <br/>
      width: {this.props.infoPaneWidth} <br/>
      height: {this.props.infoPaneHeight}
      </div>
    );
  }
}

export default InfoPane;
