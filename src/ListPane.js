import React, { Component } from 'react';
import './index.css';

class ListPane extends Component {

  render() {
    let style = {
     width: this.props.listPaneWidth + 'px',
     height: this.props.listPaneHeight + 'px',
     top: '0px',
     left: this.props.listPaneLeft + 'px',
     position: 'absolute',
    };

    return (
      <div className="listPane" style={style}>
      list pane! <br/>
      width: {this.props.listPaneWidth} <br/>
      height: {this.props.listPaneHeight}
      </div>
    );
  }
}

export default ListPane;
