import React, { Component } from 'react';
import './index.css';

class ThingsPane extends Component {
  
  updateThingInventory(thingID){
    this.props.updateThingsInventory(thingID);
  }
  renderThings(width) {

    console.log("The list from within ThingsPane: " + this.props.thingsInventory);

    return (
      <ul className="thingsList">
        {Object.entries(this.props.thingsInventory).map(([k,v]) => 
        <li className="thingListItem" >
          <Thing thingId={k} thing={v} width={width} updateThingInventory={(thingID) => this.updateThingInventory(thingID)}/>
        </li>
        )}
      </ul>
    )
  }

  render() {
    let style = {
     width: this.props.infoPaneWidth + 'px',
     height: this.props.infoPaneHeight + 'px',
     top: this.props.infoPaneTop + '0px',
     left: '0px',
    };

    return (
      <div className="thingsPane" style={style}>
        {this.renderThings(this.props.infoPaneWidth)}
      </div>
    );
  }
}

export default ThingsPane;

class Thing extends Component {

  handleClick(thing) {
    //alert("Clicked thing: " + thing);
    this.props.updateThingInventory(this.props.thingId);
  }

  render() {
    let topColor = 'lightgray';
    let rightColor = 'gray';
    let bottomColor = 'gray';
    let leftColor = 'lightgray';
    let backgroundColor = 'gray'
    if(this.props.thing.selected) {
      topColor = 'gray';
      rightColor = 'lightgray';
      bottomColor = 'lightgray';
      leftColor = 'gray';
      backgroundColor = 'white';
      
    }
    let style = {
      width: this.props.width / 14,
      height: this.props.width / 14,
      borderColor: topColor + ' ' + rightColor + ' ' + bottomColor + ' ' + leftColor,
      backgroundColor: backgroundColor,
    }

    return (
      <div className="thing" style={style} onClick={() => this.handleClick(this.props.thingId) }>   
        {this.props.thing.name}
      </div>
    );
  }
}