import React, { Component } from 'react';
import './index.css';
import { viewdata } from './viewdata.js';
import ViewItem from './ViewItem.js';

class ViewPane extends Component {

  render() {
    // Is this where we should put in the scale factor? Need to think about how this works and maybe redesign
    //let scaleFactor = this.props.isInfoMode ? .8 * this.props.scaleFactor: this.props.scaleFactor;
    let scaleFactor = this.props.isInfoMode ? .8 : 1;
    let style = {
     width: this.props.viewWidth + 'px',
     height: this.props.viewHeight + 'px',
     zoom: scaleFactor,
    };

    let allViews = viewdata;
    let viewItems = [];
    allViews[0].items.forEach((viewItem) => {
      viewItems.push(
        <ViewItem
          showPuzzleIfAllowed={(puzzleId) => this.props.showPuzzleIfAllowed(puzzleId)}
          viewHeight={this.props.viewHeight}
          viewWidth={this.props.viewWidth}
          svg={viewItem.svg}
          name={viewItem.name}
          isHidden={viewItem.isHidden}
          puzzleId={viewItem.puzzleTitle} // FIXME: make proper id?
          top={viewItem.top}
          left={viewItem.left}
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
