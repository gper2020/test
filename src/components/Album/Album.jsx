import React, { Component } from 'react';
import Panel from 'react-bootstrap/lib/Panel';

import SongInfo from './SongInfo';
import '../../css/album.css';

export default (props) => {
    const songsList = props.album.songs.map((songName, index) => <SongInfo key={index} songName={songName} />);
    return (
        <Panel expanded={props.isExpanded} onToggle={props.onToggledCallbackFn}>
            <Panel.Heading className={props.isExpanded ? "expanded" : "collapsed"}>
                <Panel.Title toggle>
                    {props.bandName} - {props.album.name}
                </Panel.Title>
            </Panel.Heading>
            <Panel.Collapse>
                <Panel.Body>
                    {songsList}
                </Panel.Body>
            </Panel.Collapse>
        </Panel>
    );
}