import React, { Component } from 'react';
import './index.css';

class ListPane extends Component {

  render() {
    let style = {
     width: this.props.listPaneWidth + 'px',
     height: this.props.listPaneHeight + 'px',
     top: '0px',
     left: this.props.listPaneLeft + 'px',
    };

    return (
      <div className="listPane" style={style}>
      </div>
    );
  }
}

export default ListPane;
