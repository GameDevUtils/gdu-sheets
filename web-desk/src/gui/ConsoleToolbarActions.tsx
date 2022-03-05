import React, {Component} from 'react';
// import { Navbar, Nav, ButtonGroup, Button } from "react-bootstrap";
import './ConsoleToolbarActions.css';
import {Button, ButtonGroup, Nav, Navbar} from "react-bootstrap";

type MyProps = {
    isRightPanelShown: boolean,
    isConsolePanelShown: boolean,
};

type MyState = {

};

export class ConsoleToolbarActions extends Component<MyProps, MyState> {
    render() {
        let className = "consoleToolbarActions" + (this.props.isRightPanelShown && this.props.isConsolePanelShown ? "" : " panel-hidden");
        return (
            <Navbar expand="lg" className={className}>
                <Nav className="me-auto">
                    <ButtonGroup id="grpManageOutput" bsPrefix="btn-sm" className="btnGroup btn-group">
                        <Button id="btnClearOutput" size="sm"><i className="far fa-trash-alt"> </i></Button>
                    </ButtonGroup>
                </Nav>
            </Navbar>
        );
    }
}