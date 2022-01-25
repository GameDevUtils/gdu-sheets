import React, {Component} from 'react';
// import { Navbar, Nav, ButtonGroup, Button } from "react-bootstrap";
// import { ProgressBar } from "react-bootstrap";
import './WorkspaceStatusBar.css';

type MyProps = {
    settingsPanelHidden: boolean,
    resourcesPanelHidden: boolean,
};

type MyState = {

};

export class WorkspaceStatusBar extends Component<MyProps, MyState> {
    render() {
        let className = "workspaceStatusBar" + (this.props.settingsPanelHidden ? " settingsPanelHidden" : "");
        className += (this.props.resourcesPanelHidden ? " resourcesPanelHidden" : "");
        return (
            <div className={className}>
                <span id="workspaceStatusBarMessage"><b>STATUS:</b> Ready. | <em>There are unsaved changes.</em></span>
                <div className="progress" id="workspaceStatusBarProgressBar">
                    <div className="progress-bar bg-primary progress-bar-striped-xx progress-bar-animated-xx" role="progressbar"> </div>
                </div>
            </div>
        );
    }
}