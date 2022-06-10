import React, {Component} from 'react';
// import { Navbar, Nav, ButtonGroup, Button } from "react-bootstrap";
import {Button, ButtonGroup, Nav, Navbar} from "react-bootstrap";
import './ResourcesToolbarActions.css';
import './ResourcesToolbarActions._blue.css';
import './ResourcesToolbarActions._green.css';
import './ResourcesToolbarActions._red.css';

type MyProps = {
    isRightPanelShown: boolean,
    isSpritePillActive: boolean,
};

type MyState = {

};

export class ResourcesToolbarActions extends Component<MyProps, MyState> {
    render() {
        let className = "resources-toolbar-actions" + (this.props.isRightPanelShown && this.props.isSpritePillActive ? "" : " panel-hidden");
        return (
            <Navbar expand="lg" className={className}>
                <Nav className="me-auto">
                    <ButtonGroup id="grpManageImages" bsPrefix="btn-sm" className="btnGroup btn-group">
                        <Button id="btnAddImages" size="sm"><i className="far fa-images"> </i></Button>
                    </ButtonGroup>

                    <ButtonGroup id="grpManageImages" bsPrefix="btn-sm" className="btnGroup btn-group">
                        <Button id="btnSelectAllImages" size="sm"><i className="far fa-check-square"> </i></Button>
                        <Button id="btnDeselectAllImages" size="sm"><i className="far fa-square"> </i></Button>
                    </ButtonGroup>

                    <ButtonGroup id="grpManageImagesDelete" bsPrefix="btn-sm" className="btnGroup btn-group">
                        <Button id="btnRemoveSelectedImages" size="sm"><i className="far fa-trash-alt"> </i></Button>
                    </ButtonGroup>
                </Nav>
            </Navbar>
        );
    }
}