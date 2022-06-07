import React, {Component} from 'react';
import './SidePanel.css';
import './SidePanelLeft.css';
import './SettingsPanelLeft.css';
import icon from './media/icon-512x512.png';

import {SettingsRowTitle} from '../components/SettingsRowTitle';
import {SettingsRowGroup} from '../components/SettingsRowGroup';

type SettingsProps = {
    handleGroupClick: any,
    isGroupExpanded: { [key: string]: boolean },
    isLeftPanelShown: boolean,
};

type SettingsState = {

};

export enum Groups {
    Output,
    Algorithm,
    Dimensions,
    Padding,
    Filters,
    Advanced,
}

export class SettingsPanelLeft extends Component<SettingsProps, SettingsState> {

    render() {
        let className = "sidePanel sidePanelLeft" + (this.props.isLeftPanelShown ? "" : " panel-hidden");
        return (
            <div className={className}>
                <div className="container-fluid">

                    <SettingsRowTitle
                        id={"divTitle" + Groups[Groups.Output]}
                        title={Groups[Groups.Output].toUpperCase()}
                        isGroupExpanded={this.props.isGroupExpanded[Groups[Groups.Output]]}
                        handleClick={this.props.handleGroupClick}
                    />

                    <SettingsRowGroup
                        id={"divTitle" + Groups[Groups.Output] + "Content"}
                        isGroupExpanded={this.props.isGroupExpanded[Groups[Groups.Output]]}
                    >

                        <div className="row config-input-row">
                            <div className="col-3 config-label config-label-two-line">Project Name</div>
                            <div className="col-9 config-input">
                                <input id="txtName" type="text" className="form-control" placeholder="Untitled" />
                            </div>
                        </div>

                        <div className="row config-input-row">
                            <div className="col-3 config-label config-label-two-line">Image Format</div>
                            <div className="col-9 config-input">
                                <select id="ddlImage" className="form-control" defaultValue="PNG">
                                    <option value="GIF">GIF</option>
                                    <option value="JPG">JPG</option>
                                    <option value="PNG">PNG &deg;</option>
                                </select>
                            </div>
                        </div>

                        <div className="row config-input-row">
                            <div className="col-3 config-label config-label-two-line">Data Format</div>
                            <div className="col-9 config-input">
                                <select id="ddlData" className="form-control" defaultValue="XML">
                                    <option value="CSS">CSS</option>
                                    <option value="JSON">JSON</option>
                                    <option value="XML">XML &deg;</option>
                                </select>
                            </div>
                        </div>

                        <div className="row config-input-row">
                            <div className="col-3 config-label config-label-two-line">Name in Atlas</div>
                            <div className="col-9 config-input">
                                <select id="ddlExtension" className="form-control" defaultValue="Strip Extension">
                                    <option value="Strip Extension">Strip Extension &deg;</option>
                                    <option value="Keep Extension">Keep Extension</option>
                                </select>
                            </div>
                        </div>

                    </SettingsRowGroup>


                    <SettingsRowTitle
                        id={"divTitle" + Groups[Groups.Algorithm]}
                        title={Groups[Groups.Algorithm].toUpperCase()}
                        isGroupExpanded={this.props.isGroupExpanded[Groups[Groups.Algorithm]]}
                        handleClick={this.props.handleGroupClick}
                    />

                    <SettingsRowGroup
                        id={"divTitle" + Groups[Groups.Algorithm] + "Content"}
                        isGroupExpanded={this.props.isGroupExpanded[Groups[Groups.Algorithm]]}
                    >

                        <div className="row config-input-row">
                            <div className="col-3 config-label config-label-two-line">Sprite Packer</div>
                            <div className="col-9 config-input">
                                <select id="ddlPacker" className="form-control" defaultValue="JoeRects">
                                    <option value="Basic">Basic</option>
                                    <option value="JoeRects">JoeRects &deg;</option>
                                </select>
                            </div>
                        </div>

                        <div className="row config-input-row">
                            <div className="col-3 config-label config-label-two-line">Sort by Property</div>
                            <div className="col-9 config-input">
                                <select id="ddlSort" className="form-control" defaultValue="AREA_DESC">
                                    <option value="AREA">AREA</option>
                                    <option value="AREA_DESC">AREA_DESC &deg;</option>
                                    <option value="HEIGHT">HEIGHT</option>
                                    <option value="HEIGHT_DESC">HEIGHT_DESC</option>
                                    <option value="NAME">NAME</option>
                                    <option value="NAME_DESC">NAME_DESC</option>
                                    <option value="WIDTH">WIDTH</option>
                                    <option value="WIDTH_DESC">WIDTH_DESC</option>
                                </select>
                            </div>
                        </div>

                        <div className="row config-input-row">
                            <div className="col-3 config-label config-label-two-line">Allow Rotate</div>
                            <div className="col-9 config-input">
                                <select id="ddlRotate" className="form-control" defaultValue="No">
                                    <option value="No">No &deg;</option>
                                    <option value="Yes">Yes</option>
                                </select>
                            </div>
                        </div>

                    </SettingsRowGroup>


                    <SettingsRowTitle
                        id={"divTitle" + Groups[Groups.Dimensions]}
                        title={Groups[Groups.Dimensions].toUpperCase()}
                        isGroupExpanded={this.props.isGroupExpanded[Groups[Groups.Dimensions]]}
                        handleClick={this.props.handleGroupClick}
                    />

                    <SettingsRowGroup
                        id={"divTitle" + Groups[Groups.Dimensions] + "Content"}
                        isGroupExpanded={this.props.isGroupExpanded[Groups[Groups.Dimensions]]}
                    >

                        <div className="row config-input-row">
                            <div className="col-3 config-label">Width</div>
                            <div className="col-9 config-input">
                                <select id="ddlWidth" className="form-control" defaultValue="1024">
                                    <option value="16">16</option>
                                    <option value="32">32</option>
                                    <option value="64">64</option>
                                    <option value="128">128</option>
                                    <option value="256">256</option>
                                    <option value="512">512</option>
                                    <option value="1024">1024 &deg;</option>
                                    <option value="2048">2048</option>
                                    <option value="4096">4096</option>
                                    <option value="8192">8192</option>
                                    <option value="16384">16384</option>
                                </select>
                            </div>
                        </div>

                        <div className="row config-input-row">
                            <div className="col-3 config-label">Height</div>
                            <div className="col-9 config-input">
                                <select id="ddlHeight" className="form-control" defaultValue="1024">
                                    <option value="16">16</option>
                                    <option value="32">32</option>
                                    <option value="64">64</option>
                                    <option value="128">128</option>
                                    <option value="256">256</option>
                                    <option value="512">512</option>
                                    <option value="1024">1024 &deg;</option>
                                    <option value="2048">2048</option>
                                    <option value="4096">4096</option>
                                    <option value="8192">8192</option>
                                    <option value="16384">16384</option>
                                </select>
                            </div>
                        </div>

                        <div className="row config-input-row">
                            <div className="col-3 config-label config-label-two-line">Size Mode</div>
                            <div className="col-9 config-input">
                                <select id="ddlSizeMode" className="form-control" defaultValue="Max Size">
                                    <option value="Fixed Size">Fixed Size</option>
                                    <option value="Max Size">Max Size &deg;</option>
                                </select>
                            </div>
                        </div>

                        <div className="row config-input-row">
                            <div className="col-3 config-label">Constraint</div>
                            <div className="col-9 config-input">
                                <select id="ddlConstraint" className="form-control" defaultValue="Power of Two">
                                    <option value="Any Size">Any Size</option>
                                    <option value="Power of Two">Power of Two &deg;</option>
                                </select>
                            </div>
                        </div>

                        <div className="row config-input-row">
                            <div className="col-3 config-label config-label-two-line">Force Square</div>
                            <div className="col-9 config-input">
                                <select id="ddlForceSquare" className="form-control" defaultValue="No">
                                    <option value="Yes">Yes</option>
                                    <option value="No">No &deg;</option>
                                </select>
                            </div>
                        </div>

                        <div className="row config-input-row">
                            <div className="col-3 config-label config-label-two-line">Include @2x</div>
                            <div className="col-9 config-input">
                                <select id="ddlAt2x" className="form-control" defaultValue="No">
                                    <option value="Yes">Yes</option>
                                    <option value="No">No &deg;</option>
                                </select>
                            </div>
                        </div>

                    </SettingsRowGroup>


                    <SettingsRowTitle
                        id={"divTitle" + Groups[Groups.Padding]}
                        title={Groups[Groups.Padding].toUpperCase()}
                        isGroupExpanded={this.props.isGroupExpanded[Groups[Groups.Padding]]}
                        handleClick={this.props.handleGroupClick}
                    />

                    <SettingsRowGroup
                        id={"divTitle" + Groups[Groups.Padding] + "Content"}
                        isGroupExpanded={this.props.isGroupExpanded[Groups[Groups.Padding]]}
                    >

                        <div className="row config-input-row">
                            <div className="col-3 config-label config-label-two-line">Border Padding</div>
                            <div className="col-9 config-input">
                                <div className="input-group">
                                    <input id="txtBorderPadding" type="text" className="form-control" placeholder="2" />
                                    <span className="input-group-text"><i className="fa fa-arrows-alt-v"> </i></span>
                                </div>
                            </div>
                        </div>

                        <div className="row config-input-row">
                            <div className="col-3 config-label config-label-two-line">Shape Padding</div>
                            <div className="col-9 config-input">
                                <div className="input-group">
                                    <input id="txtShapePadding" type="text" className="form-control" placeholder="2" />
                                    <span className="input-group-text"><i className="fa fa-arrows-alt-v"> </i></span>
                                </div>
                            </div>
                        </div>

                        <div className="row config-input-row">
                            <div className="col-3 config-label config-label-two-line">Inner Padding</div>
                            <div className="col-9 config-input">
                                <div className="input-group">
                                    <input id="txtInnerPadding" type="text" className="form-control" placeholder="0" />
                                    <span className="input-group-text"><i className="fa fa-arrows-alt-v"> </i></span>
                                </div>
                            </div>
                        </div>

                    </SettingsRowGroup>


                    <SettingsRowTitle
                        id={"divTitle" + Groups[Groups.Filters]}
                        title={Groups[Groups.Filters].toUpperCase()}
                        isGroupExpanded={this.props.isGroupExpanded[Groups[Groups.Filters]]}
                        handleClick={this.props.handleGroupClick}
                    />

                    <SettingsRowGroup
                        id={"divTitle" + Groups[Groups.Filters] + "Content"}
                        isGroupExpanded={this.props.isGroupExpanded[Groups[Groups.Filters]]}
                    >

                        <div className="row config-input-row">
                            <div className="col-3 config-label config-label-two-line">Clean Alpha</div>
                            <div className="col-9 config-input">
                                <select id="ddlCleanAlpha" className="form-control" defaultValue="No">
                                    <option value="Yes">Yes</option>
                                    <option value="No">No &deg;</option>
                                </select>
                            </div>
                        </div>

                        <div className="row config-input-row">
                            <div className="col-3 config-label config-label-two-line">Color Mask</div>
                            <div className="col-9 config-input">
                                <select id="ddlColorMask" className="form-control" defaultValue="No">
                                    <option value="Yes">Yes</option>
                                    <option value="No">No &deg;</option>
                                </select>
                            </div>
                        </div>

                        <div className="row config-input-row">
                            <div className="col-3 config-label config-label-two-line">Alias Sprites</div>
                            <div className="col-9 config-input">
                                <select id="ddlAliasSprites" className="form-control" defaultValue="No">
                                    <option value="Yes">Yes</option>
                                    <option value="No">No &deg;</option>
                                </select>
                            </div>
                        </div>

                        <div className="row config-input-row">
                            <div className="col-3 config-label config-label-two-line">Debug Mode</div>
                            <div className="col-9 config-input">
                                <select id="ddlDebugMode" className="form-control" defaultValue="No">
                                    <option value="Yes">Yes</option>
                                    <option value="No">No &deg;</option>
                                </select>
                            </div>
                        </div>

                        <div className="row config-input-row">
                            <div className="col-3 config-label config-label-two-line">Trim Mode</div>
                            <div className="col-9 config-input">
                                <select id="ddlTrimMode" className="form-control" defaultValue="None">
                                    <option value="None">None &deg;</option>
                                    <option value="Trim">Trim</option>
                                </select>
                            </div>
                        </div>

                        <div className="row config-input-row">
                            <div className="col-3 config-label config-label-two-line">Trim Threshold</div>
                            <div className="col-9 config-input">
                                <div className="input-group">
                                    <input id="txtTrimThreshold" type="text" className="form-control" placeholder="1" />
                                    <span className="input-group-text"><i className="fa fa-arrows-alt-v"> </i></span>
                                </div>
                            </div>
                        </div>

                    </SettingsRowGroup>


                    <SettingsRowTitle
                        id={"divTitle" + Groups[Groups.Advanced]}
                        title={Groups[Groups.Advanced].toUpperCase()}
                        isGroupExpanded={this.props.isGroupExpanded[Groups[Groups.Advanced]]}
                        handleClick={this.props.handleGroupClick}
                    />

                    <SettingsRowGroup
                        id={"divTitle" + Groups[Groups.Advanced] + "Content"}
                        isGroupExpanded={this.props.isGroupExpanded[Groups[Groups.Advanced]]}
                    >

                        <div className="row config-input-row">
                            <div className="col-3 config-label config-label-two-line">Animated GIF</div>
                            <div className="col-9 config-input">
                                <select id="ddlAnimatedGIF" className="form-control" defaultValue="Use First Frame">
                                    <option value="Use First Frame">Use First Frame &deg;</option>
                                    <option value="Extract Frames">Extract Frames</option>
                                </select>
                            </div>
                        </div>

                        <div className="row config-input-row">
                            <div className="col-3 config-label config-label-two-line">Compress Project</div>
                            <div className="col-9 config-input">
                                <select id="ddlZipProject" className="form-control" defaultValue="No">
                                    <option value="Yes">Yes</option>
                                    <option value="No">No &deg;</option>
                                </select>
                            </div>
                        </div>

                    </SettingsRowGroup>

                    <hr/>

                    <div className="row config-title">
                        <div className="col-12">Built with &hearts; using ...</div>
                    </div>

                    <div className="row config-input-row config-input-row-last">
                        <div className="col-12">
                            <p>This application uses code from the following open source projects.</p>
                            {/*<hr/>*/}
                            <ul style={{ "margin": "0" }}>
                                <li><a href="http://joehall.net" target="_blank" rel="noreferrer">Joe's personal website</a></li>
                                <li><a href="http://jjeasy.net" target="_blank" rel="noreferrer">Joe's Dad's band website</a></li>
                                <li><a href="http://lanierconsulting.net/" target="_blank" rel="noreferrer">Joe's friend's work website</a></li>
                            </ul>
                            <hr/>
                            <p className="homepage-icon"><img src={icon} alt="application icon" style={{ "width": "100%" }} /></p>
                            <p className="homepage-link">Visit us on the web!<br/><a href="http://gamedevutils.com/" target="_blank" rel="noreferrer">http://gamedevutils.com/</a></p>
                            <p className="homepage-copy">&copy; 2016&ndash;2021</p>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}