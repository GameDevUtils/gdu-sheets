import React, {Component} from 'react';
import { AppToolbar, APPTOOLBAR_BUTTON_SETTINGS, APPTOOLBAR_BUTTON_RESOURCES } from './gui/AppToolbar';
import { SettingsPanelLeft, Groups } from "./gui/SettingsPanelLeft";
import { WorkspaceToolbar } from "./gui/WorkspaceToolbar";
import { Workspace } from "./gui/Workspace";
import { WorkspaceStatusBar } from "./gui/WorkspaceStatusBar";
import { ResourcesToolbar } from "./gui/ResourcesToolbar";
import { ConsoleToolbarActions } from "./gui/ConsoleToolbarActions";
import { ConsolePanelRight } from "./gui/ConsolePanelRight";
import { ResourcesToolbarActions } from "./gui/ResourcesToolbarActions";
import { ResourcesPanelRight } from "./gui/ResourcesPanelRight";

import './App.css';

type AppProps = {

};

type AppState = {
    isSettingsGroupExpanded: { [key: string]: boolean },
    isAppToolbarButtonActive: { [key: string]: boolean },
    isResourcesSpritesPillActive: boolean,
};

export default class App extends Component<AppProps, AppState> {
    state: AppState = {
        isSettingsGroupExpanded: {},
        isAppToolbarButtonActive: {},
        isResourcesSpritesPillActive: true,
    };

    constructor(props: AppProps) {
        super(props);

        this.state.isSettingsGroupExpanded[Groups[Groups.Output]] = true;
        this.state.isSettingsGroupExpanded[Groups[Groups.Algorithm]] = true;
        this.state.isSettingsGroupExpanded[Groups[Groups.Dimensions]] = true;
        this.state.isSettingsGroupExpanded[Groups[Groups.Padding]] = true;
        this.state.isSettingsGroupExpanded[Groups[Groups.Filters]] = true;
        this.state.isSettingsGroupExpanded[Groups[Groups.Advanced]] = true;

        this.state.isAppToolbarButtonActive[APPTOOLBAR_BUTTON_SETTINGS] = true;
        this.state.isAppToolbarButtonActive[APPTOOLBAR_BUTTON_RESOURCES] = true;

        this.state.isResourcesSpritesPillActive = true;

        this.handleAppToolbarButtonClick = this.handleAppToolbarButtonClick.bind(this);
        this.handleSettingsGroupTitleClick = this.handleSettingsGroupTitleClick.bind(this);
        this.handleResourcesPillNavClick = this.handleResourcesPillNavClick.bind(this);
    }

    handleSettingsGroupTitleClick(e: any) {
        let groupKey = e.target.parentElement.id.replace("divTitle", "");

        this.setState(prevState => {
            let isSettingsGroupExpanded = Object.assign({}, this.state.isSettingsGroupExpanded);
            isSettingsGroupExpanded[groupKey] = !isSettingsGroupExpanded[groupKey];
            return { isSettingsGroupExpanded: { ...isSettingsGroupExpanded } };
        });
    }

    handleAppToolbarButtonClick(e: any) {
        let isAppToolbarButtonActive = Object.assign({}, this.state.isAppToolbarButtonActive);

        this.setState(prevState => {
            let id = e?.target?.id || e?.target?.parentElement?.id;
            let btn = e?.target?.id ? e?.target : e?.target?.parentElement;

            switch(id) {
                case 'btnToggleSettingsPanel':
                    //e.preventDefault();
                    isAppToolbarButtonActive[APPTOOLBAR_BUTTON_SETTINGS] = !isAppToolbarButtonActive[APPTOOLBAR_BUTTON_SETTINGS];
                    break;
                case 'btnToggleResourcesPanel':
                    //e.preventDefault();
                    isAppToolbarButtonActive[APPTOOLBAR_BUTTON_RESOURCES] = !isAppToolbarButtonActive[APPTOOLBAR_BUTTON_RESOURCES];
                    break;
            }
            btn?.blur();
            return { isAppToolbarButtonActive: { ...isAppToolbarButtonActive } };
        });
    }

    handleResourcesPillNavClick(e: any) {
        //let isSpritePillActive = this.state.isResourcesSpritesPillActive

        this.setState(prevState => {
            // let id = e?.target?.id || e?.target?.parentElement?.id;
            // let btn = e?.target?.id ? e?.target : e?.target?.parentElement;

            // let isSpritePillActive = prevState.isResourcesSpritesPillActive;

            // switch(id) {
            //     case 'btnResourcesSpritesPill':
            //         //e.preventDefault();
            //         isAppToolbarButtonActive[APPTOOLBAR_BUTTON_SETTINGS] = !isAppToolbarButtonActive[APPTOOLBAR_BUTTON_SETTINGS];
            //         break;
            //     case 'btnResourcesConsolePill':
            //         //e.preventDefault();
            //         isAppToolbarButtonActive[APPTOOLBAR_BUTTON_RESOURCES] = !isAppToolbarButtonActive[APPTOOLBAR_BUTTON_RESOURCES];
            //         break;
            // }
            // btn?.blur();
            return { isResourcesSpritesPillActive: !prevState.isResourcesSpritesPillActive };
        });
    }

    render() {
        let settingsVisible : boolean = this.state.isAppToolbarButtonActive[APPTOOLBAR_BUTTON_SETTINGS];
        let resourcesVisible : boolean = this.state.isAppToolbarButtonActive[APPTOOLBAR_BUTTON_RESOURCES];
        let isSpritePillActive : boolean = this.state.isResourcesSpritesPillActive;
        return (
          <div className="theme-bluexx theme-redxx theme-greenxx">
              <AppToolbar
                  handleButtonClick={this.handleAppToolbarButtonClick}
                  isButtonActive={this.state.isAppToolbarButtonActive} />

              <SettingsPanelLeft
                  isLeftPanelShown={settingsVisible}
                  handleGroupClick={this.handleSettingsGroupTitleClick}
                  isGroupExpanded={this.state.isSettingsGroupExpanded} />

              <div>
                  <WorkspaceToolbar
                      settingsPanelHidden={!settingsVisible}
                      resourcesPanelHidden={!resourcesVisible} />
                  <Workspace
                      settingsPanelHidden={!settingsVisible}
                      resourcesPanelHidden={!resourcesVisible} />
                  <WorkspaceStatusBar
                      settingsPanelHidden={!settingsVisible}
                      resourcesPanelHidden={!resourcesVisible} />
              </div>

              <ResourcesToolbar
                  handlePillClick={this.handleResourcesPillNavClick}
                  isRightPanelShown={resourcesVisible}
                  isSpritePillActive={isSpritePillActive} />
              <ResourcesToolbarActions
                  isRightPanelShown={resourcesVisible}
                  isSpritePillActive={isSpritePillActive} />
              <ResourcesPanelRight
                  isRightPanelShown={resourcesVisible}
                  isSpritePillActive={isSpritePillActive} />
              <ConsoleToolbarActions
                  isRightPanelShown={resourcesVisible}
                  isConsolePanelShown={!isSpritePillActive} />
              <ConsolePanelRight
                  isRightPanelShown={resourcesVisible}
                  isConsolePanelShown={!isSpritePillActive} />
          </div>
        );
    }
}
