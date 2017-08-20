import React, { Component } from 'react';
import ReactPDF from 'react-pdf'
import './index.css';
import ToggleButton from './ToggleButton.js';

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

  showPuzzleDiag(puzzle) {
    // TODO: need to hook this up
    console.log ("From the show puzzle in list pane: " + puzzle);
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
  
  handleClick(puzzle) {
    this.props.showPuzzleDiag(puzzle);
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

    let status = this.props.puzzle.status === 'complete' ? "Y" : "N";
    let arc = this.props.puzzle.arc.substring(0,2);
    return (
      <div className="puzzleItem" style={style} onClick={() => this.handleClick(this.props.puzzle.title) }>   
        <div className="puzzleItemPdf" style={pdfStyle}>
          <ReactPDF
            file={this.props.puzzle.pdf}
            width={pdfWidth}
          />
        </div>
        <div className="statusIcon">
          {status}
        </div>
        <div className="arcIcon">
          {arc}
        </div>
      </div>
    );
  }
}