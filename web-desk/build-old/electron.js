const path = require('path');

const { app, BrowserWindow, Menu, shell, dialog, autoUpdater, MessageBoxOptions } = require('electron');
const isDev = require('electron-is-dev');

let template = [{
    label: 'Edit',
    submenu: [{
        label: 'undo',
        accelerator: 'CmdOrCtrl+Z',
        role: 'undo'
    }, {
        label: 'redo',
        accelerator: 'Shift+CmdOrCtrl+Z',
        role: 'redo'
    }, {
        type: 'separator'
    }, {
        label: 'cut',
        accelerator: 'CmdOrCtrl+X',
        role: 'cut'
    }, {
        label: 'copy',
        accelerator: 'CmdOrCtrl+C',
        role: 'copy'
    }, {
        label: 'paste',
        accelerator: 'CmdOrCtrl+V',
        role: 'paste'
    }, {
        label: 'select all',
        accelerator: 'CmdOrCtrl+A',
        role: 'selectall'
    }]
}, {
    label: 'view',
    submenu: [{
        label: 'overload',
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
        label: 'switch full screen',
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
        label: 'switch developer tools',
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
        label: 'application menu demonstration',
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
    label: 'window',
    role: 'window',
    submenu: [{
        label: 'minimize',
        accelerator: 'CmdOrCtrl+M',
        role: 'minimize'
    }, {
        label: 'close',
        accelerator: 'CmdOrCtrl+W',
        role: 'close'
    }, {
        type: 'separator'
    }, {
        label: 'reopen the window',
        accelerator: 'CmdOrCtrl+Shift+T',
        enabled: false,
        key: 'reopenMenuItem',
        click: function () {
            app.emit('activate')
        }
    }]
}, {
    label: 'help',
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
        label: 'checking for updates ...',
        enabled: false,
        key: 'checkingForUpdate'
    }, {
        label: 'check for updates',
        visible: false,
        key: 'checkForUpdate',
        click: function () {
            autoUpdater.checkForUpdates();
        }
    }, {
        label: 'restart and install the update',
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
    // Create the browser window.
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        show: false,
        webPreferences: {
            enableRemoteModule: true,
            nodeIntegration: true,
            contextIsolation: false,
        },
    });

    win.webContents.on('did-finish-load', () => {
        win.maximize();
        win.show();

        // Open the DevTools.
        if (isDev) {
            win.webContents.openDevTools({ mode: 'detach' });
        }
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
