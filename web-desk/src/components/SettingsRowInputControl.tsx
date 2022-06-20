import React, { Component } from 'react';
import './SettingsRowInputControl.css';


export enum InputControlType {
    Title,
    Text,
    DropDown,
    Number,
    ComboBox,
    UNKNOWN,
}

type InputControlProps = {
    id: string | null | undefined;
    controlType: InputControlType | null | undefined;

    label: string | null | undefined;
    wrap: boolean | null | undefined;

    title: string | null | undefined;
    placeholder: string | number | null | undefined;
    values: string[] | number[] | null | undefined;
    defaultValue: string | number | null | undefined;

    hint: string | null | undefined;
};

type InputControlState = {
    value: string | number | null | undefined;
    controlType: InputControlType;
};

export class SettingsRowInputControl extends Component<InputControlProps, InputControlState> {

    state: InputControlState = {
        value: null,
        controlType: InputControlType.UNKNOWN
    };

    static determineInputControlType(state: InputControlState, props: InputControlProps) {
        // default control type
        state.controlType = InputControlType.UNKNOWN;

        if(props.controlType !== InputControlType.UNKNOWN && props.controlType !== null && props.controlType !== undefined) {
            // caller specified the control type, so use it
            state.controlType = props.controlType;
        } else if(props.title && !props.hint) {
            // has a title, without a hint? it's a Title
            state.controlType = InputControlType.Title;
        } else if(props.label && props.hint) {
            // has a label and a hint? one of ComboBox, DropDown, Text, or Number
            if(props.values && props.values.length && Array.isArray(props.values)) {
                if(props.placeholder !== undefined && props.placeholder !== null) {
                    // has a placeholder and array of values? it's a ComboBox
                    state.controlType = InputControlType.ComboBox;
                } if(props.defaultValue !== undefined && props.defaultValue !== null) {
                    // has a defaultValue without placeholder? it's a DropDown
                    state.controlType = InputControlType.DropDown;
                }
            } else if(typeof props.defaultValue === "string") {
                // if type of defaultValue is a string, it's a String
                state.controlType = InputControlType.Text;
            } else if(typeof props.defaultValue === "number") {
                // if type of defaultValue is a number, it's a Number
                state.controlType = InputControlType.Number;
            }
        }
    }

    constructor(props: InputControlProps) {
        super(props);

        SettingsRowInputControl.determineInputControlType(this.state, this.props);
    }

    render() {
        let result: JSX.Element; // = <div></div>;
        let wrapClass = this.props.wrap ? "config-label-two-line" : "config-label";

        switch(this.state.controlType) {
            case InputControlType.Title:
                result = (
                    <div className="row config-title">
                        <div className="col-12">{ this.props.title }</div>
                    </div>
                );
                break;
            case InputControlType.Text:
                result = (
                    <div className="row config-input-row">
                        <div className={`col-3 config-label ${wrapClass}`}>{this.props.label}</div>
                        <div className="col-8 config-input">
                            <input id={`${this.props.id}`} type="text" className="form-control" placeholder={`${this.props.placeholder}`} />
                        </div>
                        <div className="col-1 config-input">
                            <i className="fa fa-question-circle" title={`${this.props.hint}`}> </i>
                        </div>
                    </div>
                );
                break;
            case InputControlType.Number:
                result = (
                    <div className="row config-input-row">
                        <div className={`col-3 config-label ${wrapClass}`}>{this.props.label}</div>
                        <div className="col-8 config-input">
                            <div className="input-group">
                                <input id={`${this.props.id}`} type="text" className="form-control" placeholder={`${this.props.placeholder}`} />
                                <span className="input-group-text"><i className="fa fa-arrows-alt-v"> </i></span>
                            </div>
                        </div>
                        <div className="col-1 config-input">
                            <i className="fa fa-question-circle" title={`${this.props.hint}`}> </i>
                        </div>
                    </div>
                );
                break;
            case InputControlType.DropDown:
                result = <div> </div>;
                break;
            case InputControlType.ComboBox:
                result = <div> </div>;
                break;
            case InputControlType.UNKNOWN:
            default:
                result = (
                    <div className="row config-title-error">
                        <div className="col-12"><i className="bi bi-exclamation-triangle"> </i> Unrecognized InputControlType.</div>
                    </div>
                );
                break;
        }

        return result;
    }
}