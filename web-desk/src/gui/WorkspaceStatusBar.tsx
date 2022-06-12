import React, {Component} from 'react';
import './WorkspaceStatusBar.css';
import './WorkspaceStatusBar._blue.scss';
import './WorkspaceStatusBar._green.scss';
import './WorkspaceStatusBar._orange.scss';
import './WorkspaceStatusBar._red.scss';

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