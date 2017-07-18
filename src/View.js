import React, { Component } from 'react';
import './index.css';

class View extends Component {

  constructor(props) {
    super(props);
  }

  render() {
   let style = {
     width: this.props.viewWidth + 'px',
     height: this.props.viewHeight + 'px',
     position: 'absolute',
   };

  return (
      <div className="view" style={style}>
        width: {this.props.viewWidth} <br/>
        height: {this.props.viewHeight} <br/>
      </div>
    );
  }
}

export default View;
