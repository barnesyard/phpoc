import React, { Component } from 'react';
import './index.css';
import Game from './Game.js';

// App class is used for the entire contents of the browser window. We want to optimize for 
// screens that have a 16:9 ratio but just in case we want to do anything outside of that ratio
// this object will give us access to that space
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
    }
  }

  handleResize(event) {
    this.setState({
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
    })
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  //will resize cause child objects to be updated?
  render() {
    // Set the app div to be same size as window. Probably not needed.
    let style = {
      width: this.state.windowWidth + 'px',
      height: this.state.windowHeight + 'px',
    };

    return (
      <div className="app" style={style}>
        <Game 
          appWidth = {this.state.windowWidth}
          appHeight = {this.state.windowHeight}
        />
      </div>
    );
  }
}

export default App;
