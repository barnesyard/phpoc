import React, { Component } from 'react';
import './index.css';

class View extends Component {

  constructor(props) {
    super(props);
    this.state = {
      viewWidth: this.props.appWidth - 10,
      viewHeight: this.props.appHeight - 10,
    }
  }

  render() {
    let viewHeight, viewWidth;
    // Handle resizing so that the view window stays in a 16:9 ratio
    if ((this.state.viewWidth / this.state.viewHeight) > 16 / 9 ) {
      viewWidth = this.state.viewHeight / 9 * 16;
    } else {
      viewHeight = this.state.viewWidth / 16 * 9;
    }

   let style = {
    width: viewWidth + 'px',
    height: viewHeight + 'px',
    //transform: 'translate3d(5px,5px,0)',
   };

  return (
      <div className="view" style={style}>
      </div>
    );
  }
}

export default View;
