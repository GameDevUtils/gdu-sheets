import React, {Component} from 'react';
// import { Navbar, Nav, ButtonGroup, Button } from "react-bootstrap";
import {Button, ButtonGroup, Nav, Navbar} from "react-bootstrap";
import './WorkspaceToolbar.css';
import './WorkspaceToolbar._blue.scss';
import './WorkspaceToolbar._green.scss';
import './WorkspaceToolbar._orange.scss';
import './WorkspaceToolbar._red.scss';
import './WorkspaceToolbar._purple.scss';
import './WorkspaceToolbar._yellow.scss';

type MyProps = {
    settingsPanelHidden: boolean,
    resourcesPanelHidden: boolean,
    handleThemeSelected: any;
};

type MyState = {

};

export class WorkspaceToolbar extends Component<MyProps, MyState> {
    render() {
        let className =
            "workspaceToolbar" +
            (this.props.settingsPanelHidden ? " settingsPanelHidden" : "") +
            (this.props.resourcesPanelHidden ? " resourcesPanelHidden" : "");
        return (
            <Navbar expand="lg" className={className}>
                <Nav className="me-auto">
                    <ButtonGroup id="grpZoomInOut" bsPrefix="btn-x" className="btnGroup btn-group">
                        <Button id="btnZoomOut"><i className="fa fa-search-minus"> </i></Button>
                        <Button id="btnZoomIn"><i className="fa fa-search-plus"> </i></Button>
                    </ButtonGroup>

                    <ButtonGroup id="grpZoomPercent" bsPrefix="btn-x" className="btnGroup btn-group">
                        <select id="ddlZoomPercent" className="form-control" defaultValue="100.0">
                            <option value="1600.0">1600.0%</option>
                            <option value="800.0">800.0%</option>
                            <option value="400.0">400.0%</option>
                            <option value="200.0">200.0%</option>
                            <option value="100.0">100.0% &deg;</option>
                            <option value="50.0">50.0%</option>
                            <option value="25.0">25.0%</option>
                            <option value="12.5">12.5%</option>
                        </select>
                    </ButtonGroup>

                    <ButtonGroup id="grpFitToWorkspace" bsPrefix="btn-x" className="btnGroup btn-group">
                        <Button><i className="fa fa-arrows-alt-h"> </i></Button>
                        <Button><i className="fa fa-arrows-alt-v"> </i></Button>
                        <Button><i className="fa fa-expand-alt"> </i></Button>
                    </ButtonGroup>

                    <ButtonGroup id="grpThemes" bsPrefix="btn-x" className="btnGroup btn-group">
                        <select onChange={this.props.handleThemeSelected} id="ddlTheme" className="form-control" defaultValue="default">
                            <option value="red">Red</option>
                            <option value="blue">Blue</option>
                            <option value="green">Green</option>
                            <option value="orange">Orange</option>
                            <option value="purple">Purple</option>
                            <option value="yellow">Yellow</option>
                            <option value="default">Default</option>
                        </select>
                    </ButtonGroup>

                </Nav>
            </Navbar>
        );
    }
}