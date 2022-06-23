import React, {Component} from 'react';
import './WorkspaceStatusBar.css';
import './WorkspaceStatusBar._yellow.scss';

type MyProps = {
    settingsPanelHidden: boolean,
    resourcesPanelHidden: boolean,
    theme: string,
};

type MyState = {

};

export class WorkspaceStatusBar extends Component<MyProps, MyState> {
    render() {
        let progressBarClassName = "";
        switch(this.props.theme) {
            case "yellow": progressBarClassName = "bg-success";  break;
        }

        let className = "workspaceStatusBar" +
            (this.props.settingsPanelHidden ? " settingsPanelHidden" : "") +
            (this.props.resourcesPanelHidden ? " resourcesPanelHidden" : "");
        return (
            <div className={className}>
                <span id="workspaceStatusBarMessage"><b>STATUS:</b> Ready. | <em>There are unsaved changes.</em></span>
                <div className="progress" id="workspaceStatusBarProgressBar">
                    <div className={`progress-bar ${progressBarClassName} progress-bar-striped progress-bar-animated`} role="progressbar"> </div>
                </div>
            </div>
        );
    }
}