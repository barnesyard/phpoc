import React, { Component } from 'react';
import './index.css';
import ToggleButton from './ToggleButton.js';
import eyeIcon from './assets/img/eye.svg';
import hourglassIcon from './assets/img/hourglass.svg';
import emc2Icon from './assets/img/emc2.svg';
import funnelIcon from './assets/img/funnel.svg';
import windowlIcon from './assets/img/window.svg';
import figureIcon from './assets/img/figure.svg';

class ListPane extends Component {
  constructor(props) {
    super(props);

    this.state = {
        groupBy: 'all',
        search: '',
        collapsedGroups: new Set(),
        filteredArcs: new Set(this.arcFilterTypes())
    };
  }

  arcFilterTypes() {
    let arcTypes = [];
    this.props.arcData.map(a => arcTypes.push(a.descriptor));
    return arcTypes;
  }

  solveFilterTypes() {
    return [ '☐', '☑' ];
  }

  groupTypes() {
    return ["all", "arc", "status"];
  }

  handleGroupingToggle(event, groupType) {
    event.stopPropagation();
    this.setState({groupBy: groupType})
  }

  searchTextChanged(event) {
    event.stopPropagation();
    this.setState({ search: event.target.value });
  }

  isVisible(puzzle) {
    return puzzle.title.toLowerCase().includes(this.state.search.toLowerCase())
        && this.state.filteredArcs.has(puzzle.arc);
        //&& this.state.filteredTypes.has(puzzle.Solved ? '☑' : '☐');
  }

  showPuzzleDiag(puzzleId) {
    this.props.showPuzzle(puzzleId);
  }

  /////////////////////////////////////////////////////////////////////////////
  // Render the toggle buttons that will all the user to change how puzzles 
  // are grouped in the list of puzzles.
  renderGroupToggles() {
    return (
      <div className="groupControls"> Group By: <br/>
        {this.groupTypes().map(g => 
          <label key={g}
            className={this.state.groupBy === g ? 'selected' : 'unselected'}>
            {g}
            <input type="radio" name="state" value={g} onClick={e => this.handleGroupingToggle(e, g)}/>
          </label> 
          )
        }
        <br/><br/>
      </div>      
    );
  }

  /////////////////////////////////////////////////////////////////////////////
  // Render the toggle buttons that will all the user to filter out puzzles in 
  // the list based on the arc the puzzle is assocatied with.
  renderArcFilterButtons() {
    return (
      <div> Filter: <br/>
        {this.props.arcData.map(a => 
          <ToggleButton 
          key={a.descriptor} 
          descriptor={a.descriptor} 
          altText={a.dimension} 
            img={a.icon}
            onClick={(event, groupName, toggleType) => this.toggle(event, groupName, toggleType)}
          />
        )}
      </div>
    )
  }

  /////////////////////////////////////////////////////////////////////////////
  // Top level method for rendering the list of puzzles
  renderPuzzleList() {
    const puzzles = this.props.puzzleList;

    switch (this.state.groupBy) {
      case "all": return this.renderUngroupedPuzzleList(puzzles);
      case "arc": return this.renderGroupedPuzzleList(puzzles, "arc");
      case "status": return this.renderGroupedPuzzleList(puzzles, "status");
      default : alert(this.state.groupBy);
    }
  }

  /////////////////////////////////////////////////////////////////////////////
  // This method renders the list of puzzle items without any grouping. This
  // will take in an array of puzzles and produce a flat list
  renderUngroupedPuzzleList(puzzles) {
    const filterdPuzzles = puzzles.filter(p => this.isVisible(p));
    
    return (
      <ul className="puzzleItemsList">
        {filterdPuzzles.map(v => this.renderPuzzleListItem(v) )}
      </ul>
    )
  }

  /////////////////////////////////////////////////////////////////////////////
  // This method renders the list of puzzle items with grouping. This
  // will take in an array of puzzles and produce a list of puzzles that are 
  // grouped based on toggle settings.
  renderGroupedPuzzleList(puzzles, groupType) {
    const byGroup = puzzles.reduce((groups, puzzle) => {
        const g = puzzle[groupType];
        groups[g] = groups[g] || [];
        groups[g].push(puzzle);
        return groups;
    }, {});

    return Object.keys(byGroup).sort().map(
        a => this.renderPuzzleListGroup(a, byGroup[a]));
  }

  /////////////////////////////////////////////////////////////////////////////
  // This method handles the rendering of a single group inside a grouped
  // puzzle list. So if you wanted to group the list of puzzles by 'solved'
  // and 'unsovled' the method handles rendering a single group like 'solved'
  // and you loop through all groups to create an entire list with multiple groups.
  renderPuzzleListGroup(groupName, contents) {
    const opened = !this.state.collapsedGroups.has(groupName);
    const state = opened ? "opened" : "closed";

    let displayName = groupName;
    if (groupName === "true") {
      displayName = "Solved";
    } else if (groupName === "false") {
      displayName = "Unsolved";
    }

    return (
      <div className="grouping">
      <li className={`groupHeader ${state}`}
        key={`${groupName}-${contents.length}-${state}`}
        onClick={e => this.toggle(e, groupName, 'collapsedGroups')}>
        <br/><br/>
        {displayName}
        {opened && this.renderUngroupedPuzzleList(contents)}
       </li>
      </div>);
  }

  /////////////////////////////////////////////////////////////////////////////
  // This method renders a single item within the list.
  renderPuzzleListItem(puzzle) {
    return (
      <li className="puzzleListItem" >
        <PuzzleItem puzzle={puzzle} width={this.props.listPaneWidth} showPuzzleDiag={(p) => this.showPuzzleDiag(p)}/>
      </li>
    )
  }

  /////////////////////////////////////////////////////////////////////////////
  // This method handles a toggle to the grouping or the filtering and updates
  // the state to reflect the change.
  toggle(event, groupName, toggleType) {
    event.stopPropagation();

    // The proper way to alter state is to get the current value, modify them
    // and then set state to the modified values. Here oldState is passed in 
    // as the values that are currently in the state so they can be modified.
    this.setState(oldState => {
      const groups = oldState[toggleType];
      if (groups.has(groupName)) {
        groups.delete(groupName);
      } else {
        groups.add(groupName);
      }
      return { [toggleType]: groups };
    });
  }

  /////////////////////////////////////////////////////////////////////////////
  // Let's render this list pane and all its contents
  render() {
    let style = {
     width: this.props.listPaneWidth + 'px',
     height: this.props.listPaneHeight + 'px',
     top: '0px',
     left: this.props.listPaneLeft + 'px',
    };
 
    return (
      <div className="listPane" style={style}>
        <div className="listControls">
          Title Search: <input type="text" onChange={e => this.searchTextChanged(e)} /> <br/>
          {this.renderGroupToggles()}
          {this.renderArcFilterButtons()}
        </div>
        {this.renderPuzzleList()}
      </div>
    );
  }
}

export default ListPane;

class PuzzleItem extends Component {
  
  handleClick(puzzleId) {
    this.props.showPuzzleDiag(puzzleId);
  }

  setStatusIcon(status) {
    if (status === 'complete') {
      return (
        <svg x="0px" y="0px" width="30%" height="30%" viewBox="0 0 60 60" enableBackground="new 0 0 60 60" xmlSpace="preserve">
          <g>
            <path fill="#00AEEF" d="M44.711,29.23l-4.475-4.445c-0.426-0.422-0.293-0.874,0.295-1.005c0,0,0.484-0.109,1.082-0.703
              c1.283-1.273,1.281-3.341,0-4.613c-1.283-1.274-3.362-1.274-4.646,0c-0.598,0.594-0.707,1.075-0.707,1.075
              c-0.132,0.584-0.587,0.715-1.013,0.292l-4.476-4.441c-0.425-0.423-1.124-0.423-1.547,0l-4.474,4.442
              c-0.425,0.424-0.293,0.877,0.294,1.008c0,0,0.486,0.108,1.083,0.701c1.281,1.273,1.283,3.341,0,4.615
              c-1.282,1.273-3.364,1.271-4.646,0c-0.597-0.594-0.707-1.076-0.707-1.076c-0.132-0.583-0.589-0.715-1.014-0.292l-4.475,4.444
              c-0.425,0.422-0.425,1.114,0,1.538l4.475,4.441c0.425,0.424,0.293,0.876-0.294,1.008c0,0-0.485,0.109-1.083,0.702
              c-1.283,1.274-1.283,3.34,0,4.614c1.282,1.273,3.362,1.273,4.646,0c0.598-0.594,0.707-1.075,0.707-1.075
              c0.132-0.585,0.588-0.715,1.014-0.291l4.474,4.442c0.425,0.423,1.123,0.423,1.547,0l4.476-4.443
              c0.426-0.422,0.292-0.877-0.294-1.008c0,0-0.486-0.108-1.084-0.7c-1.283-1.274-1.282-3.341,0-4.615
              c1.283-1.272,3.363-1.274,4.646,0c0.598,0.595,0.705,1.076,0.705,1.076c0.133,0.584,0.59,0.716,1.016,0.293l4.475-4.444
              C45.137,30.346,45.137,29.653,44.711,29.23z"/>
          </g>
          <circle fill="#00C800" cx="30.605" cy="30" r="24.121"/>
          <rect x="32.589" y="14.635" transform="matrix(0.7072 0.7071 -0.7071 0.7072 31.4934 -16.04)" fill="#FFFFFF" width="5.043" height="30.728"/>
          <rect x="19.721" y="27.6" transform="matrix(0.707 -0.7072 0.7072 0.707 -18.4966 26.0932)" fill="#FFFFFF" width="5.043" height="15.539"/>
        </svg>
      );
    } else {
      return (
        <svg x="0px" y="0px" width="30%" height="30%" viewBox="0 0 60 60" enableBackground="new 0 0 612 792" xmlSpace="preserve">
          <circle fill="#FFFFFF" cx="30" cy="30" r="30"/>
          <path fill="#00AEEF" d="M8.264,26.113c-0.049-0.012-0.098-0.029-0.146-0.05c-0.198-0.09-0.352-0.254-0.428-0.456L3.986,15.81 
            c-0.157-0.423,0.054-0.896,0.477-1.055c0.42-0.155,0.839-0.132,1.155,0.135l12.447,5.665c0.495,0.106,0.788,0.348,0.95,0.77 
            c0.157,0.423-0.053,0.895-0.476,1.054l-9.797,3.705C8.588,26.142,8.422,26.15,8.264,26.113z"/>
          <path fill="#00AEEF" d="M30.134,5.879c-8.938,0-16.735,4.866-20.902,12.089l3.371,1.957c3.492-6.063,10.033-10.147,17.531-10.147 
            c11.169,0,20.223,9.054,20.223,20.223c0,11.169-9.054,20.223-20.223,20.223c-7.47,0-13.989-4.054-17.491-10.077l-3.38,1.941 
            c4.175,7.192,11.956,12.034,20.871,12.034c13.322,0,24.121-10.799,24.121-24.121C54.255,16.679,43.456,5.879,30.134,5.879z"/>
          <g>
            <path fill="#00AEEF" d="M44.711,29.23l-4.474-4.445c-0.426-0.422-0.294-0.874,0.294-1.005c0,0,0.484-0.109,1.082-0.703 
              c1.283-1.273,1.282-3.341,0-4.613c-1.283-1.274-3.362-1.274-4.646,0c-0.598,0.594-0.707,1.075-0.707,1.075
              c-0.132,0.584-0.587,0.715-1.013,0.292l-4.476-4.441c-0.425-0.423-1.123-0.423-1.547,0l-4.474,4.442
              c-0.425,0.424-0.293,0.877,0.294,1.008c0,0,0.486,0.108,1.083,0.701c1.281,1.273,1.283,3.341,0,4.615
              c-1.282,1.273-3.364,1.272-4.646,0c-0.597-0.594-0.707-1.076-0.707-1.076c-0.132-0.583-0.589-0.715-1.014-0.292l-4.475,4.444
              c-0.425,0.422-0.425,1.114,0,1.537l4.475,4.442c0.425,0.424,0.293,0.876-0.294,1.008c0,0-0.485,0.109-1.083,0.702
              c-1.283,1.274-1.283,3.34,0,4.614c1.282,1.273,3.362,1.274,4.646,0c0.598-0.594,0.707-1.075,0.707-1.075
              c0.132-0.585,0.588-0.715,1.014-0.291l4.474,4.442c0.425,0.423,1.123,0.423,1.547,0l4.476-4.443
              c0.426-0.422,0.292-0.877-0.294-1.008c0,0-0.486-0.108-1.084-0.7c-1.283-1.275-1.282-3.341,0-4.615
              c1.283-1.273,3.363-1.274,4.646,0c0.598,0.594,0.706,1.076,0.706,1.076c0.133,0.584,0.589,0.716,1.016,0.293l4.474-4.444
              C45.137,30.346,45.137,29.653,44.711,29.23z"/>
          </g>
        </svg>
      );
    }
  }
  
  setArcIcon(arc) {
    let icon = arc.substring(0,2); 
    if (arc === 'eye') {icon = <img src={eyeIcon} alt='eye' style={{width: '30%'}} />};
    if (arc === 'hourglass') {icon = <img src={hourglassIcon} alt='hourglass' style={{width: '30%', left: '0px'}} />};
    if (arc === 'emc2') {icon = <img src={emc2Icon} alt='emc2' style={{width: '50%', left: '0px', bottom: '-10px'}} />};
    if (arc === 'funnel') {icon = <img src={funnelIcon} alt='funnel' style={{width: '30%', left: '0px'}} />};
    if (arc === 'window') {icon = <img src={windowlIcon} alt='window' style={{width: '30%', left: '0px'}} />};
    if (arc === 'figure') {icon = <img src={figureIcon} alt='figure' style={{width: '30%', left: '0px'}} />};
    return (icon);
  }

  render() {
    // set the width to be such that 2 list items will fit in the pane with some space
    let width = this.props.width / 2.6;
    let height = width;
    let style = {
      width: width,
      height: height,
    }

    // we want the PDF to be 0.9* height of the puzzle item
    //assuming the PDF pages are all 8.5x11 we can calculate the width we want
    let pdfWidth = ( 0.9 * height * 8.5 / 11); 
    let pdfStyle = {
      width: pdfWidth + 'px',
      left: ((width - pdfWidth) / 2) + 'px',
      top: ( .05 * height ) +'px',
    };

    return (
      <div className="puzzleItem" style={style} onClick={() => this.handleClick(this.props.puzzle.title) }>   
        <div className="puzzleItemPdf" style={pdfStyle}>
          <img src={this.props.puzzle.png} alt='puzzleIcon' style={{width: '95%'}} />
        </div>
        <div className="statusIcon">
          {this.setStatusIcon(this.props.puzzle.status)}
        </div>
        <div className="arcIcon">
          {this.setArcIcon(this.props.puzzle.arc)}
        </div>
      </div>
    );
  }
}