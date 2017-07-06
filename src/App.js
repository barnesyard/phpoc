import React, { Component } from 'react';
import './index.css';
import View from './View.js';

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


  render() {
    let appWidth = this.state.windowWidth,
        appHeight = this.state.windowHeight;
    // Handle resizing so that the view window stays in a 16:9 ratio
    if ((appWidth / appHeight) > 16 / 9 ) {
      appWidth = appHeight / 9 * 16;
    } else {
      appHeight = appWidth / 16 * 9;
    }

    let style = {
      width: this.state.windowWidth + 'px',
      height: this.state.windowHeight + 'px',
   };

    return (
      <div className="app" style={style}>
        <View 
          appWidth = {this.state.windowWidth}
          appHeight = {this.state.windowHeight}
        />
      </div>
    );
  }
}

export default App;
