import React, { Component } from 'react';
import {Modal, Button} from "react-bootstrap";
import {Buffer} from "buffer"

type GroupProps = {
    show: boolean;
    // id: string;
    // title: string |null | undefined;
    // isGroupExpanded: boolean | null | undefined;
    // handleClick: any;
    handleSave: any;
    handleClose: any;
};

type GroupState = {
    show: boolean;
};

export class PromptToSave extends Component<GroupProps, GroupState> {

    state: GroupState = {
        show: true,
    };

    // handleClose() { this.setState({ show: false }); }
    // handleShow() { this.setState({ show: true }) }

    constructor(props: GroupProps) {
        super(props);

        this.state.show = props.show;

        // this.handleClose = this.handleClose.bind(this);
        // this.handleShow = this.handleShow.bind(this);
    }

    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.handleClose} backdrop={"static"} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Save Changes?</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>You have unsaved changes. Save your changes now?</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="primary" onClick={this.props.handleSave}>Save Changes</Button>
                    <Button variant="outline-danger" onClick={this.props.handleClose}>Do Not Save</Button>
                    <Button variant="outline-secondary" onClick={this.props.handleClose}>Cancel</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}