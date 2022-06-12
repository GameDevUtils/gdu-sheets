import './AppToolbar.css';
import React, {Component} from 'react';
// import { Navbar, Nav, ButtonGroup, Button } from "react-bootstrap";

type MyProps = {
    handleButtonClick: any,
    isButtonActive: { [key: string]: boolean },
};

type MyState = {

};

export const APPTOOLBAR_BUTTON_SETTINGS: string = "APPTOOLBAR_BUTTON_SETTINGS";
export const APPTOOLBAR_BUTTON_RESOURCES: string = "APPTOOLBAR_BUTTON_RESOURCES";
export const APPTOOLBAR_BUTTON_NEW_PROJECT: string = "APPTOOLBAR_BUTTON_NEW_PROJECT";

export class AppToolbar extends Component<MyProps, MyState> {
    render() {
        let settingsButtonClassName = "btn btn-primary" + (this.props.isButtonActive[APPTOOLBAR_BUTTON_SETTINGS] ? " activexx" : "");
        let resourcesButtonClassName = "btn btn-primary" + (this.props.isButtonActive[APPTOOLBAR_BUTTON_RESOURCES] ? " activexx" : "");
        return (

            <nav className="appToolbar navbar navbar-expand-lg navbar-light">
                <div className="me-auto navbar-nav">
                    <div id="grpFile" role="group" className="btnGroup btn-group btn-x">
                        <button id="btnNewProject" type="button" className="btn btn-primary" onClick={this.props.handleButtonClick}><i className="fa fa-file"> </i> New</button>
                        <button id="btnOpenProject" type="button" className="btn btn-primary" onClick={this.props.handleButtonClick}><i className="fa fa-folder-open"> </i> Open
                        </button>
                        <button type="button" className="btn btn-primary"><i className="fa fa-file-download"> </i> Save
                        </button>
                    </div>
                    <div id="grpSprite" role="group" className="btnGroup btn-group btn-x">
                        <button type="button" className="btn btn-primary"><i className="fa fa-images"> </i> Add</button>
                        <button type="button" className="btn btn-primary"><i className="fa fa-times"> </i> Remove
                        </button>
                    </div>
                    <div id="grpSheet" role="group" className="btnGroup btn-group btn-x">
                        <button type="button" className="btn btn-primary"><i className="fa fa-sync-alt"> </i> Refresh
                        </button>
                        <button type="button" className="btn btn-primary"><i className="fa fa-share-square"> </i> Publish
                        </button>
                    </div>
                    <div id="grpShow" role="group" className="btnGroup btn-group btn-x">
                        <button id="btnToggleSettingsPanel" type="button" className={settingsButtonClassName} onClick={this.props.handleButtonClick}><i
                            className="bi bi-layout-sidebar-inset"> </i> Settings
                        </button>
                        <button id="btnToggleResourcesPanel" type="button" className={resourcesButtonClassName} onClick={this.props.handleButtonClick}><i
                            className="bi bi-layout-sidebar-inset-reverse"> </i> Resources
                        </button>
                    </div>
                </div>
                <div id="grpWebsite" role="group" className="btnGroupLast btn-x">
                    <button type="button" className="btn btn-primary"><i
                        className="fa fa-external-link-alt"> </i> GameDevUtils.com
                    </button>
                </div>
            </nav>

        );
    }
}