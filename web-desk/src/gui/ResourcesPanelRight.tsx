import React, {Component, ReactNode} from 'react';
import './SidePanel.css';
import './SidePanelRight.css';
import './SidePanelRight._blue.scss';
import './SidePanelRight._green.scss';
import './SidePanelRight._orange.scss';
import './SidePanelRight._red.scss';
import './ResourcesPanelRight.css';
import './ResourcesPanelRight._blue.scss';
import './ResourcesPanelRight._green.scss';
import './ResourcesPanelRight._orange.scss';
import './ResourcesPanelRight._red.scss';
import {FileUtil, ImageFormat, ImageItem, ImageUtil, Project} from "gdu-common";
// import {ImageUtil_ImageParser, ImageUtil_BMP, ImageUtil_GIF, ImageUtil_JPG, ImageUtil_PNG} from "gdu-common";
// import {Buffer} from "buffer";
// import NdArray from "ndarray";

type MyProps = {
    isRightPanelShown: boolean,
    isSpritePillActive: boolean,
    project: Project,
};

type MyState = {

};

export class ResourcesPanelRight extends Component<MyProps, MyState> {

    renderImageItems(): ReactNode[] {
        const result = [] as ReactNode[];
        const project = this.props.project;

        if(!!project?.images) {
            Object.getOwnPropertyNames(this.props.project?.images)
                .forEach((key, index) => {
                    const item = this.props.project?.images[key];
                    if(item) {
                        const dimensions = ((item.frames?.length ?? 0) > 0) ?
                            (item.frames[0].width ?? "??") + "x" + (item.frames[0].height ?? "??") : "??x??";
                        const size: number =
                            item?.frames?.length ?? 0 > 0 ?
                            item?.frames[0].data?.length ?? 0 : 0;
                        const sizeDisplay = size > 999 ?
                            (Math.max(size / 1024, 0).toPrecision(2)) + "KB" :
                            (Math.max(size, 0).toPrecision(2)) + " bytes";
                        result.push(
                            <div key={key} className="sprite-entity" data-index={index} data-path={item.fullpath}
                                 title={item.fullpath}>
                                <div className="sprite-entity-image">
                                    <img alt={item.filename} src={item.src}
                                         style={{width: "50px", height: "50px"}}/>
                                </div>
                                <div className="sprite-entity-name">{item.filename}</div>
                                <div
                                    className="sprite-entity-meta">{dimensions} {(item.filetype ?? "???").toUpperCase()}, {sizeDisplay}<br/><span>{item.fullpath}</span>
                                </div>
                            </div>
                        );
                    }
                });
        }
        return result;
    }

    render() {
        let className = "sidePanel sidePanelRight" + (this.props.isRightPanelShown && this.props.isSpritePillActive ? "" : " panel-hidden");
        const imageItems = this.renderImageItems();
        return (
            <div className={className} id="divResourcesPanel">
                <div className="container-fluid">

                    {imageItems}

                </div>
            </div>
        );
    }
}
