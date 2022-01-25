import React, {Component} from 'react';
// import { Navbar, Nav, ButtonGroup, Button } from "react-bootstrap";
import './SidePanel.css';
import './Workspace.css';

type MyProps = {
    settingsPanelHidden: boolean,
    resourcesPanelHidden: boolean,
};

type MyState = {

};

export class Workspace extends Component<MyProps, MyState> {
    render() {
        let className = "workspacePanel" + (this.props.settingsPanelHidden ? " settingsPanelHidden" : "");
        className += (this.props.resourcesPanelHidden ? " resourcesPanelHidden" : "");
        return (
            <div className={className}>
                <div id="divSprites"> </div>
            </div>
        );
    }
}