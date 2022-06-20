import React, { Component } from 'react';
import './SettingsRowTitle.css';
import './SettingsRowTitle._blue.scss';
import './SettingsRowTitle._green.scss';
import './SettingsRowTitle._orange.scss';
import './SettingsRowTitle._red.scss';
import './SettingsRowTitle._purple.scss';
import './SettingsRowTitle._yellow.scss';

type GroupProps = {
    id: string;
    title: string |null | undefined;
    isGroupExpanded: boolean | null | undefined;
    handleClick: any;
};

type GroupState = {
    isGroupExpanded: boolean | null | undefined;
};

export class SettingsRowTitle extends Component<GroupProps, GroupState> {

    state: GroupState = {
        isGroupExpanded: null,
    };

    constructor(props: GroupProps) {
        super(props);

        this.state.isGroupExpanded = this.props.isGroupExpanded ?? true;
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e: any) {
        this.setState(prevState => ({
            isGroupExpanded: !prevState.isGroupExpanded
        }));
        if(this.props.handleClick) {
            this.props.handleClick(e);
        }
    }

    render() {
        //let wrapClass = this.props.wrap ? "config-label-two-line" : "config-label";
        let caretDirection = this.state.isGroupExpanded ? "down" : "right";

        return this.props.title ? (
            <div className="row config-title" id={this.props.id} onClick={this.handleClick}>
                <div className="col-2"> </div>
                <div className="col-8">{this.props.title}</div>
                <div className={`col-2 bi bi-caret-${caretDirection}-fill title-caret`}> </div>
            </div>
        ) : (
            <div className="row config-title-error">
                <div className="col-12"><i className="bi bi-exclamation-triangle"> </i> {`Bad title, '${this.props.title}'.`}</div>
            </div>
        );
    }
}