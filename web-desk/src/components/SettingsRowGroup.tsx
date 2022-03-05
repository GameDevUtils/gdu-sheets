import React, { Component } from 'react';
import './SettingsRowGroup.css';
// import {SettingsRowTitle} from "./SettingsRowTitle";


type GroupProps = {
    id: string;
    isGroupExpanded: boolean | null | undefined;
};

type GroupState = {
    isGroupExpanded: boolean | null | undefined;
};

export class SettingsRowGroup extends Component<GroupProps, GroupState> {

    state: GroupState = {
        isGroupExpanded: null,
    };

    constructor(props: GroupProps) {
        super(props);

        this.state.isGroupExpanded = this.props.isGroupExpanded; // ?? true;
    }

    render() {
        return (
            <div id={this.props.id} className={this.props.isGroupExpanded ? "group-shown" : "group-hidden"}>
                { this.props.children }
            </div>
        );
    }
}
