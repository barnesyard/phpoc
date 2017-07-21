import React, { Component } from 'react';

class Room extends Component {

    handleClick() {
        this.props.showPuzzle();
    }

    render() {
        let style = {
            width: this.props.viewWidth - 30 + 'px',
            height: this.props.viewHeight - 30 + 'px',
            top: '15px',
            left: '15px',
        };

        return (
            <div className="room" style={style}>
                <svg>
                    <circle cx={250} cy={100} r={20} fill="red"
                    onClick={() => this.handleClick()} />
                </svg>
            </div>
        );
    }
}

export default Room;
