import React, {Component} from 'react';
import './WorkspaceStatusBar.css';
import './WorkspaceStatusBar.blue.css';
import './WorkspaceStatusBar.green.css';
import './WorkspaceStatusBar.red.css';

type MyProps = {
    settingsPanelHidden: boolean,
    resourcesPanelHidden: boolean,
};

type MyState = {

};

export class WorkspaceStatusBar extends Component<MyProps, MyState> {
    render() {
        let className = "workspaceStatusBar" +
            (this.props.settingsPanelHidden ? " settingsPanelHidden" : "") +
            (this.props.resourcesPanelHidden ? " resourcesPanelHidden" : "");
        return (
            <div className={className}>
                <span id="workspaceStatusBarMessage"><b>STATUS:</b> Ready. | <em>There are unsaved changes.</em></span>
                <div className="progress" id="workspaceStatusBarProgressBar">
                    <div className="progress-bar bg-default progress-bar-striped progress-bar-animated" role="progressbar"> </div>
                </div>
            </div>
        );
    }
}