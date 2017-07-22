import React, { Component } from 'react';
import './index.css';
import PDFJS from 'pdfjs-dist-for-node';

// Temporarily store path to a PDF file for testing:
// const pdfUrl = 'http://www.liferay.com/documents/31578/11925632/sample.pdf'
 const pdfUrl = 'https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf'
// This file give me "Invalid PDF structure" when I save it locally
//const pdfUrl = '../assets/Tracemonkey.pdf'
// const pdfUrl = "file:///C:/Users/tbarnes/code/PuzzleUI/phpoc/assets/Tracemonkey.pdf"

// PDF class has highest div for holding the PDF to be viewed and the chidren
class Pdf extends Component {

  constructor (props) {
    super(props)
    this.state = {
      pdf: null,
      scale: 1.2,
    }
  }

  getChildContext () {
    return {
      pdf: this.state.pdf,
      scale: this.state.scale
    }
  }
  
  componentDidMount () {
    //PDFJS.getDocument(this.props.src).then((pdf) => {
    PDFJS.getDocument(pdfUrl).then((pdf) => {
      console.log("LOOK HERE: ")
      console.log(pdf)
      this.setState({ pdf })
    })
  }

  render() {
    return (<div className='pdf-context'>
      <Viewer/>
      </div>) 
   };

} //close of the "class Pdf"

// Specifying the type for the prop that will be passed 
// comment out while hard coding the src path
//Pdf.propTypes = {
//  src: React.PropTypes.string.isRequired,
//}

// Specifying the types for the items returned by Pdf class's getChildContext
Pdf.childContextTypes = {
  pdf: React.PropTypes.object,
  scale: React.PropTypes.number,
}

class Page extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      status: 'N/A',
      page: null,
      width: 0,
      height: 0
    }
  }

  shouldComponentUpdate (nextProps, nextState, nextContext) {
    return this.context.pdf !== nextContext.pdf || this.state.status !== nextState.status
  }

  componentDidUpdate (nextProps, nextState, nextContext) {
    this._update(nextContext.pdf) 
  }

  componentDidMount () {
    this._update(this.context.pdf) 
  }

  _update (pdf) {
    if (pdf) {
      this._loadPage(pdf)
    } else {
      this.setState({ status: 'loading' }) 
    }
  }

  _loadPage (pdf) {
    if (this.state.status === 'rendering' || this.state.page != null) return; 
    pdf.getPage(this.props.index).then(this._renderPage.bind(this))
    this.setState({ status: 'rendering' })
  }
  

  _renderPage (page) {
    console.log(page)
    let { scale } = this.context 
    let viewport = page.getViewport(scale)
    let { width, height } = viewport
    let canvas = this.refs.canvas
    let context = canvas.getContext('2d')
    console.log(viewport.height, viewport.width)
    canvas.width = width
    canvas.height = height
    
    page.render({
      canvasContext: context,
      viewport
    })
    
    this.setState({ status: 'rendered', page, width, height })
  }

  render () {
    let { width, height, status } = this.state
    return (
      <div className={`pdf-page {status}`} style={{width, height}}>
        <canvas ref='canvas' />
      </div>
    )
  }

} //end of "class Page"

Page.propTypes = {
  index: React.PropTypes.number.isRequired
}

Page.contextTypes = Pdf.childContextTypes

class Viewer extends React.Component {
  render () {
    let { pdf } = this.context
    let numPages = pdf ? pdf.pdfInfo.numPages : 0
    let fingerprint = pdf ? pdf.pdfInfo.fingerprint : 'none'
    let pages = Array.apply(null, { length: numPages })
      .map((v, i) => (<Page index={i + 1} key={`${fingerprint}-${i}`}/>))
    
    return (
      <div className='pdf-viewer'>
        {pages[0]}
      </div>
    )
  }
}

Viewer.contextTypes = Pdf.childContextTypes

export default Pdf;
