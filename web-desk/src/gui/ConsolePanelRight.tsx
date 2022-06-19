import React, {Component} from 'react';
// import { Navbar, Nav, ButtonGroup, Button } from "react-bootstrap";
import './SidePanel.css';
import './SidePanelRight.css';
import './SidePanelRight._blue.scss';
import './SidePanelRight._green.scss';
import './SidePanelRight._orange.scss';
import './SidePanelRight._red.scss';
import './SidePanelRight._purple.scss';
import './SidePanelRight._yellow.scss';
import './ConsolePanelRight.css';
import './ConsolePanelRight._blue.scss';
import './ConsolePanelRight._green.scss';
import './ConsolePanelRight._orange.scss';
import './ConsolePanelRight._red.scss';
import './ConsolePanelRight._purple.scss';
import './ConsolePanelRight._yellow.scss';

type MyProps = {
    isRightPanelShown: boolean,
    isConsolePanelShown: boolean,
};

type MyState = {

};

export class ConsolePanelRight extends Component<MyProps, MyState> {
    render() {
        let className = "sidePanel sidePanelRight" + (this.props.isRightPanelShown && this.props.isConsolePanelShown ? "" : " panel-hidden");
        return (
            <div className={className} id="divConsolePanel">
                <div className="container-fluid">

                    <div className="console-line">This is a line of output.</div>

                    <div className="console-line">This is a line of output.</div>

                    <div className="console-line">This is a line of output.</div>

                    <div className="console-line">This is a line of output.</div>

                    <div className="console-line">This is a line of output.</div>

                    <div className="console-line">This is a line of output.</div>

                    <div className="console-line">This is a line of output.</div>

                    <div className="console-line">This is a line of output.</div>

                    <div className="console-line">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus quis ullamcorper mi, eu egestas elit.</div>

                    <div className="console-line">This is a line of output.</div>

                    <div className="console-line">Donec eget metus eros. Aenean ut lacus ut elit lacinia fringilla ut id turpis.</div>

                    <div className="console-line">This is a line of output.</div>

                    <div className="console-line">Sed vulputate felis massa, sit amet eleifend nulla vehicula mollis. Nullam varius nec justo non bibendum.</div>

                    <div className="console-line">This is a line of output.</div>

                    <div className="console-line">This is a line of output.</div>

                    <div className="console-line">This is a line of output.</div>

                    <div className="console-line">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus quis ullamcorper mi, eu egestas elit.</div>

                    <div className="console-line">This is a line of output.</div>

                    <div className="console-line">Donec eget metus eros. Aenean ut lacus ut elit lacinia fringilla ut id turpis.</div>

                    <div className="console-line">This is a line of output.</div>

                    <div className="console-line">Sed vulputate felis massa, sit amet eleifend nulla vehicula mollis. Nullam varius nec justo non bibendum.</div>

                    <div className="console-line">This is a line of output.</div>

                    <div className="console-line">This is a line of output.</div>

                    <div className="console-line">This is a line of output.</div>

                    <div className="console-line">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus quis ullamcorper mi, eu egestas elit.</div>

                    <div className="console-line">This is a line of output.</div>

                    <div className="console-line">Donec eget metus eros. Aenean ut lacus ut elit lacinia fringilla ut id turpis.</div>

                    <div className="console-line">This is a line of output.</div>

                    <div className="console-line">Sed vulputate felis massa, sit amet eleifend nulla vehicula mollis. Nullam varius nec justo non bibendum.</div>

                    <div className="console-line">This is a line of output.</div>

                    <div className="console-line">This is a line of output.</div>

                    <div className="console-line">This is a line of output.</div>

                    <div className="console-line">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus quis ullamcorper mi, eu egestas elit.</div>

                    <div className="console-line">This is a line of output.</div>

                    <div className="console-line">Donec eget metus eros. Aenean ut lacus ut elit lacinia fringilla ut id turpis.</div>

                    <div className="console-line">This is a line of output.</div>

                    <div className="console-line">Sed vulputate felis massa, sit amet eleifend nulla vehicula mollis. Nullam varius nec justo non bibendum.</div>

                    <div className="console-line">This is a line of output.</div>

                </div>
            </div>
        );
    }
}