import React, {Component} from 'react';

import './SidePanel.css';
import './ResourcesToolbar.css';
import './ResourcesToolbar._blue.css';
import './ResourcesToolbar._green.css';
import './ResourcesToolbar._red.css';

type MyProps = {
    isRightPanelShown: boolean,
    isSpritePillActive: boolean,
    handlePillClick: any,
};

type MyState = {

};

export class ResourcesToolbar extends Component<MyProps, MyState> {
    render() {
        let classNameNav = "resources-toolbar" + (this.props.isRightPanelShown ? "" : " panel-hidden");
        let classNameSpritesPill = "nav-item" + (this.props.isSpritePillActive ? " active" : "");
        let classNameConsolePill = "nav-item justify-content-end" + (!this.props.isSpritePillActive ? " active" : "");
        return (
            <div className={classNameNav}>
                <ul className="nav nav-pills custom-pills-color">
                    <li className={classNameSpritesPill}>
                        {/*<a className="nav-link" aria-current="page" href="#null"><i className="bi bi-layout-wtf"></i> Sprites</a>*/}
                        <a id="btnResourcesSpritesPill" onClick={this.props.handlePillClick} className="nav-link" aria-current="page" href="#top"><i className="bi bi-images"> </i> Sprites</a>
                    </li>
                    <li className={classNameConsolePill}>
                        <a id="btnResourcesConsolePill" onClick={this.props.handlePillClick} className="nav-link" href="#top"><i className="bi bi-card-text"> </i> Console</a>
                    </li>
                </ul>
            </div>
        );
    }
}