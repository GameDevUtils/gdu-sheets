const path = require('path');

const { app, BrowserWindow, Menu, shell, dialog, autoUpdater, ipcMain, MessageBoxOptions } = require('electron');
const isDev = require('electron-is-dev');

function setTheme(item, win, themeName) {
    // win.webContents.send('update-theme', themeName);
}

let template = [
    {
    label: '&File',
    submenu: [{
        label: '&New',
        accelerator: 'CmdOrCtrl+N',
        role: 'newProject'
    }, {
        label: 'New Window',
        accelerator: 'Shift+CmdOrCtrl+N',
        role: 'newWindowProject'
    }, {
        label: '&Open...',
        accelerator: 'CmdOrCtrl+O',
        role: 'openProject'
    }, {
        label: '&Save',
        accelerator: 'CmdOrCtrl+S',
        role: 'saveProject'
    }, {
        label: 'Save &As...',
        accelerator: 'Shift+CmdOrCtrl+S',
        role: 'saveAsProject'
    }, {
        label: 'Open &Recent',
        accelerator: 'CmdOrCtrl+R',
        submenu: [

        ]
    }, {
        type: 'separator'
    }, {
        label: '&Close',
        accelerator: 'CmdOrCtrl+W',
        role: 'close'
    }]
}, {
    label: 'Edit',
    submenu: [
        { label: 'Undo', role: 'undo' },
        { label: 'Redo', role: 'redo' },
        { type: 'separator' },
        { label: 'Cut', role: 'cut' },
        { label: 'Copy', role: 'copy' },
        { label: 'Paste', role: 'paste' },
        { label: 'Select All', role: 'selectall' },
    ]
}, {
    label: 'View',
    submenu: [{
        label: 'Theme',
        submenu: [
            {
                label: 'Default',
                click: (item, win) => { setTheme(item, win, 'default'); },
            },
            {
                label: 'Monochrome',
                submenu: [
                    { label: 'yellow', click: (item, win) => { setTheme(item, win, 'yellow'); } },
                    { label: 'default', click: (item, win) => { setTheme(item, win, 'default'); } },
                ],
            },
            {
                label: 'Bootswatch',
                submenu: [
                    { label: 'Minty', click: (item, win) => { setTheme(item, win, 'minty'); } },
                    { label: 'Slate', click: (item, win) => { setTheme(item, win, 'slate'); } },
                ],
            },
        ],
        accelerator: 'CmdOrCtrl+R',
        click: function (item, focusedWindow) {
            if (focusedWindow) {
                if (focusedWindow.id === 1) {
                    BrowserWindow.getAllWindows().forEach(function (win) {
                        if (win.id > 1) {
                            win.close()
                        }
                    })
                }
                focusedWindow.reload()
            }
        }
    }, {
        type: 'separator'
    }, {
        label: 'Overload',
        accelerator: 'CmdOrCtrl+R',
        click: function (item, focusedWindow) {
            if (focusedWindow) {
                //After overloading, refresh and close all secondary forms
                if (focusedWindow.id === 1) {
                    BrowserWindow.getAllWindows().forEach(function (win) {
                        if (win.id > 1) {
                            win.close()
                        }
                    })
                }
                focusedWindow.reload()
            }
        }
    }, {
        label: 'Full Screen',
        accelerator: (function () {
            if (process.platform === 'darwin') {
                return 'Ctrl+Command+F'
            } else {
                return 'F11'
            }
        })(),
        click: function (item, focusedWindow) {
            if (focusedWindow) {
                focusedWindow.setFullScreen(!focusedWindow.isFullScreen())
            }
        }
    }, {
        label: 'Developer Tools',
        accelerator: (function () {
            if (process.platform === 'darwin') {
                return 'Alt+Command+I'
            } else {
                return 'Ctrl+Shift+I'
            }
        })(),
        click: function (item, focusedWindow) {
            if (focusedWindow) {
                focusedWindow.toggleDevTools()
            }
        }
    }, {
        type: 'separator'
    }, {
        label: 'App Menu Demo',
        click: function (item, focusedWindow) {
            if (focusedWindow) {
                const options = {
                    type: 'info',
                    title: 'application menu demonstration',
                    buttons: ['ok '],
                    message: 'this demo is used in the menu section to show how to create clickable menu items in the application menu.'
                }
                // let x = new MessageBoxOptions();
                // x.
                dialog.showMessageBox(focusedWindow, options, function () {})
            }
        }
    }]
}, {
    label: 'Window',
    role: 'window',
    submenu: [{
        label: 'Minimize',
        accelerator: 'CmdOrCtrl+M',
        role: 'minimize'
    }, {
        label: 'Close',
        accelerator: 'CmdOrCtrl+W',
        role: 'close'
    }, {
        type: 'separator'
    }, {
        label: 'Reopen Window',
        accelerator: 'CmdOrCtrl+Shift+T',
        enabled: false,
        key: 'reopenMenuItem',
        click: function () {
            app.emit('activate')
        }
    }]
}, {
    label: 'Help',
    role: 'help',
    submenu: [{
        label: 'learn more',
        click: function () {
            shell.openExternal('http://electron.atom.io');
        }
    }]
}]



function addUpdateMenuItems (items, position) {
    if (process.mas) return;

    const version = app.getVersion();
    let updateItems = [{
        label: `Version ${version}`,
        enabled: false
    }, {
        label: 'Checking for updates ...',
        enabled: false,
        key: 'checkingForUpdate'
    }, {
        label: 'Check for Updates',
        visible: false,
        key: 'checkForUpdate',
        click: function () {
            autoUpdater.checkForUpdates();
        }
    }, {
        label: 'Restart and Install the Update',
        enabled: true,
        visible: true,
        key: 'restartToUpdate',
        click: function () {
            autoUpdater.quitAndInstall();
        }
    }]

    items.splice.apply(items, [position, 0].concat(updateItems))
}




function findReopenMenuItem () {
    const menu = Menu.getApplicationMenu()
    if (!menu) return

    let reopenMenuItem
    menu.items.forEach(function (item) {
        if (item.submenu) {
            item.submenu.items.forEach(function (item) {
                if (item.key === 'reopenMenuItem') {
                    reopenMenuItem = item
                }
            })
        }
    })
    return reopenMenuItem
}




if (process.platform === 'darwin') {
    const name = app.getName();
    template.unshift({
        label: name,
        submenu: [{
            label: `about ${name}`,
            role: 'about'
        }, {
            type: 'separator'
        }, {
            label: 'service',
            role: 'services',
            submenu: []
        }, {
            type: 'separator'
        }, {
            label: `hide ${name}`,
            accelerator: 'Command+H',
            role: 'hide'
        }, {
            label: 'hide others',
            accelerator: 'Command+Alt+H',
            role: 'hideothers'
        }, {
            label: 'show all',
            role: 'unhide'
        }, {
            type: 'separator'
        }, {
            label: 'exit',
            accelerator: 'Command+Q',
            click: function () {
                app.quit();
            }
        }]
    });

    //Window menu
    template[3].submenu.push({
        type: 'separator'
    }, {
        label: 'pre all',
        role: 'front'
    });

    addUpdateMenuItems(template[0].submenu, 1);
}




if (process.platform === 'win32') {
    const helpMenu = template[template.length - 1].submenu;
    addUpdateMenuItems(helpMenu, 0);
}

// app.on('ready', function () {
//     const menu = Menu.buildFromTemplate(template);
//     Menu.setApplicationMenu(menu);
//
//     app.setName("GDU - Sprite Sheets")
//     createWindow();
// });

app.on('browser-window-created', function () {
    let reopenMenuItem = findReopenMenuItem();
    if (reopenMenuItem) reopenMenuItem.enabled = false;
});

app.on('window-all-closed', function () {
    let reopenMenuItem = findReopenMenuItem();
    if (reopenMenuItem) reopenMenuItem.enabled = true;
});






function createWindow() {

    app.dock.setIcon(`${__dirname}/icons/mac/GameDevUtils.png`);

    // Create the browser window.
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        show: false,
        webPreferences: {
            enableRemoteModule: true,
            nodeIntegration: true,
            contextIsolation: false,
            // preload: path.join(__dirname, 'preload.js'),
        },
    });
            // icon: `${__dirname}/icons/mac/GameDevUtils.png`,

    win.webContents.on('did-finish-load', () => {
        win.setIcon(`${path.join(__dirname, '/icons/mac/GameDevUtils.png')}`);
        win.maximize();
        win.show();

        // Open the DevTools.
        if (isDev) {
            win.webContents.openDevTools({ mode: 'detach' });
        }
        // win.setIcon(`${__dirname}/icons/mac/GameDevUtils.png`);
    });

    // and load the index.html of the app.
    // win.loadFile("index.html");
    win.loadURL(
        isDev
            ? 'http://localhost:3000'
            : `file://${path.join(__dirname, '../build/index.html')}`
    );
}

// // This method will be called when Electron has finished
// // initialization and is ready to create browser windows.
// // Some APIs can only be used after this event occurs.
// app.whenReady().then(createWindow);
//app.whenReady().then(() => {
app.on('ready', () => {
    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);

    app.dock.setIcon(`${path.join(__dirname, '../public/icons/mac/GameDevUtils.png')}`);


    //app.setName("GDU - Sprite Sheets")
    createWindow();
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
