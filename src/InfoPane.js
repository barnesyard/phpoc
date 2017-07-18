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
      info pane! <br/>
      width: {this.props.infoPaneWidth} <br/>
      height: {this.props.infoPaneHeight} <br/>
      top: {this.props.infoPaneTop}
      </div>
    );
  }
}

export default InfoPane;
