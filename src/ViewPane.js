import React, { Component } from 'react';
import './index.css';
import ViewItem from './ViewItem.js';

class ViewPane extends Component {

  render() {
    let scaleFactor = this.props.isInfoMode ? .8 : 1;
    let style = {
     width: this.props.viewWidth + 'px',
     height: this.props.viewHeight + 'px',
     zoom: scaleFactor,
    };

    let viewItems = [];
      this.props.viewData.items.forEach((viewItem) => {
        viewItems.push(
        <ViewItem
          roomItemClicked={(puzzleId, requiredItems) => this.props.roomItemClicked(puzzleId, requiredItems)}
          getRoomItemStatus ={(puzzleId) => this.props.getRoomItemStatus(puzzleId)}
          svg={viewItem.svg}
          top={viewItem.top}
          left={viewItem.left}
          width={viewItem.width}
          name={viewItem.name}
          isHidden={viewItem.isHidden}
          puzzleId={viewItem.puzzleTitle} // FIXME: make proper id?
          requiredItems={viewItem.requiredItems}
          key={viewItem.name}/>) 
    })
    
    return (
      <div className="viewpane" style={style}>
        {viewItems}
      </div>
    );
  }
}

export default ViewPane;
