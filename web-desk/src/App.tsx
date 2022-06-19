import React, {Component} from 'react';
import {
    AppToolbar,
    APPTOOLBAR_BUTTON_NEW_PROJECT,
    APPTOOLBAR_BUTTON_RESOURCES,
    APPTOOLBAR_BUTTON_SETTINGS
} from './gui/AppToolbar';
import {Groups, SettingsPanelLeft} from "./gui/SettingsPanelLeft";
import {WorkspaceToolbar} from "./gui/WorkspaceToolbar";
import {Workspace} from "./gui/Workspace";
import {WorkspaceStatusBar} from "./gui/WorkspaceStatusBar";
import {ResourcesToolbar} from "./gui/ResourcesToolbar";
import {ConsoleToolbarActions} from "./gui/ConsoleToolbarActions";
import {ConsolePanelRight} from "./gui/ConsolePanelRight";
import {ResourcesToolbarActions} from "./gui/ResourcesToolbarActions";
import {ResourcesPanelRight} from "./gui/ResourcesPanelRight";
import {PromptToSave} from "./components/PromptToSave";
import {APPLICATION_VERSION, Project, ProjectUtil} from "gdu-common";
import {remote} from "electron";

import './App.css';
import fs from "fs";

type AppProps = {

};

type AppState = {
    isSettingsGroupExpanded: { [key: string]: boolean },
    isAppToolbarButtonActive: { [key: string]: boolean },
    isResourcesSpritesPillActive: boolean,
    showModal: boolean,
    project: Project,
    projectPath: string,
    theme: string;
    isDirty: boolean,
};

export default class App extends Component<AppProps, AppState> {
    state: AppState = {
        isSettingsGroupExpanded: {},
        isAppToolbarButtonActive: {},
        isResourcesSpritesPillActive: true,
        showModal: false,
        project: ProjectUtil.DEFAULT_PROJECT,
        projectPath: '',
        theme: '',
        isDirty: false,
    };

    constructor(props: AppProps) {
        super(props);

        this.state.isSettingsGroupExpanded[Groups[Groups.Output]] = true;
        this.state.isSettingsGroupExpanded[Groups[Groups.Algorithm]] = true;
        this.state.isSettingsGroupExpanded[Groups[Groups.Dimensions]] = true;
        this.state.isSettingsGroupExpanded[Groups[Groups.Padding]] = true;
        this.state.isSettingsGroupExpanded[Groups[Groups.Filters]] = true;
        this.state.isSettingsGroupExpanded[Groups[Groups.Advanced]] = true;

        this.state.isAppToolbarButtonActive[APPTOOLBAR_BUTTON_NEW_PROJECT] = true;
        this.state.isAppToolbarButtonActive[APPTOOLBAR_BUTTON_SETTINGS] = true;
        this.state.isAppToolbarButtonActive[APPTOOLBAR_BUTTON_RESOURCES] = true;

        this.state.isResourcesSpritesPillActive = true;

        this.state.showModal = false;
        this.state.project = ProjectUtil.DEFAULT_PROJECT;
        this.state.projectPath = '';

        this.handleAppToolbarButtonClick = this.handleAppToolbarButtonClick.bind(this);
        this.handleThemeSelected = this.handleThemeSelected.bind(this);
        this.handleWorkspaceToolbarButtonClick = this.handleWorkspaceToolbarButtonClick.bind(this);
        this.handleSettingsGroupTitleClick = this.handleSettingsGroupTitleClick.bind(this);
        this.handleResourcesPillNavClick = this.handleResourcesPillNavClick.bind(this);

        this.toggleShowForPromptToSave = this.toggleShowForPromptToSave.bind(this);
        this.handleSaveForPromptToSave = this.handleSaveForPromptToSave.bind(this);
    }

    handleSettingsGroupTitleClick(e: any) {
        let groupKey = e.target.parentElement.id.replace("divTitle", "");

        this.setState(prevState => {
            let isSettingsGroupExpanded = Object.assign({}, this.state.isSettingsGroupExpanded);
            isSettingsGroupExpanded[groupKey] = !isSettingsGroupExpanded[groupKey];
            return { isSettingsGroupExpanded: { ...isSettingsGroupExpanded } };
        });
    }

    showOpenProjectDialog() {
        const result = remote.dialog.showOpenDialogSync({
            title: 'Open Project',
            buttonLabel: 'Open Project',
            filters: [{ name: "", extensions: ['sheets', 'sheetz'] }],
            properties: [
                'openFile',
            ],
            message: 'Select a project to open.',
        });

        if(result && result.length > 0 && result[0].length > 0) {
            const projectPath = result[0];
            let project = ProjectUtil.DEFAULT_PROJECT;
            const electronFs = remote.require("fs");
            const exists = electronFs.existsSync(projectPath);

            if(exists) {
                const data = electronFs.readFileSync(projectPath, { flag: 'r'}).toString();
                project = ProjectUtil.deserialize(data, APPLICATION_VERSION.CURRENT);
            }

            this.setState({
                projectPath: projectPath,
                project: project,
                isDirty: false,
            });
        }
    }

    handleThemeSelected(e: any) {
        let theme = e?.target?.value;
        let btn = e?.target?.id ? e?.target : e?.target?.parentElement;

        btn?.blur();
        this.setState(prevState => {
            return { theme: theme };
        });
    }

    handleAppToolbarButtonClick(e: any) {
        let isAppToolbarButtonActive = Object.assign({}, this.state.isAppToolbarButtonActive);
        let doShowPromptToSaveModal: boolean = false;
        let doShowOpenProjectDialog: boolean = false;

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
                case 'btnNewProject':
                    doShowPromptToSaveModal = true;
                    break;
                case 'btnOpenProject':
                    doShowOpenProjectDialog = true;
                    break;
            }
            btn?.blur();
            return { isAppToolbarButtonActive: { ...isAppToolbarButtonActive } };
        }, () => {
            if(doShowPromptToSaveModal) {
                this.toggleShowForPromptToSave({});
            } else if(doShowOpenProjectDialog) {
                this.showOpenProjectDialog();
            }
        });
    }

    handleWorkspaceToolbarButtonClick(e: any) {
    }

    handleResourcesPillNavClick(e: any) {
        this.setState(prevState => {
            return { isResourcesSpritesPillActive: !prevState.isResourcesSpritesPillActive };
        });
    }

    toggleShowForPromptToSave(e: any) {
        this.setState({showModal: !this.state.showModal});
    }

    handleSaveForPromptToSave(e: any) {
        // TODO: save project
    }

    render() {
        let settingsVisible : boolean = this.state.isAppToolbarButtonActive[APPTOOLBAR_BUTTON_SETTINGS];
        let resourcesVisible : boolean = this.state.isAppToolbarButtonActive[APPTOOLBAR_BUTTON_RESOURCES];
        let isSpritePillActive : boolean = this.state.isResourcesSpritesPillActive;
        let theme = "theme-" + this.state.theme;

        return (
          <div className={theme}>
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
                      resourcesPanelHidden={!resourcesVisible}
                      handleThemeSelected={this.handleThemeSelected}
                  />
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
                  isSpritePillActive={isSpritePillActive}
                  project={this.state.project} />
              <ConsoleToolbarActions
                  isRightPanelShown={resourcesVisible}
                  isConsolePanelShown={!isSpritePillActive} />
              <ConsolePanelRight
                  isRightPanelShown={resourcesVisible}
                  isConsolePanelShown={!isSpritePillActive} />
              <PromptToSave show={this.state.showModal} handleClose={this.toggleShowForPromptToSave} handleSave={this.handleSaveForPromptToSave} />
          </div>
        );
    }
}
