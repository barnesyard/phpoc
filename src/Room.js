import React, { Component } from 'react';
import { roomdata } from './roomdata.js';

class Room extends Component {

    handleClick() {
        this.props.showPuzzle();
    }

    render() {
        let color = "lime";
        let itemLeft = 250;
        let itemTop = 80;
        let style = {
            width: this.props.viewWidth - 30 + 'px',
            height: this.props.viewHeight - 30 + 'px',
            top: '15px',
            left: '15px',
        };

        let allRooms = roomdata(() => this.handleClick());
        let room = allRooms[0]; // todo: more robust room-finding algorithm

        return (
            <div className="room" style={style}>
                <svg width={this.props.viewWidth}>
                    {room.items.map(item => item.svg)}
                </svg>
            </div>
        );
    }
}

class RoomItem extends Component {

}

export default Room;
