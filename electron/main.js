const { app, BrowserWindow, dialog } = require('electron');
// const smalltalk = require('smalltalk/bundle');
let appUserDataPath = app.getPath('userData');
const nodeFs = require('fs');
const nodePath = require('path');

function createWindow() {
	// Create the browser window.
	const mainWindow = new BrowserWindow({
		width: 1024,
		height: 768,
		titleBarStyle: 'hiddenInset'
	})

	mainWindow.setMenuBarVisibility(false)
	// mainWindow.setKiosk(true)
	mainWindow.setWindowButtonVisibility(false)

	const conf = nodePath.join(appUserDataPath, 'config.json');
	const confExists = nodeFs.existsSync(conf);

	if (!confExists) {
		nodeFs.writeFileSync(conf, JSON.stringify({}));
	}

	const confData = JSON.parse(nodeFs.readFileSync(conf, 'utf8'))
	let server = confData.server

	// If server config option is missing then ask for it and put it in the config file
	if (!server) {
		server = "http://localhost:3000"
		// smalltalk
		// 	.prompt("Server Location"
		// 	, "The server is not set. Please enter the server address"
		// 	, "http://localhost:3000")
		// 	.then(
		// 		value => {
		// 			confData.server = value;
		// 			nodeFs.writeFileSync(conf, JSON.stringify(confData));
		// 			return value;
		// 		}
		// 	)
		// 	.catch(
		// 		error => {
		// 			console.log(error);
		// 			return null;
		// 		}
		// 	);
	}

	mainWindow.loadURL(server);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
	createWindow()

	app.on('activate', function () {
		// On macOS it's common to re-create a window in the app when the
		// dock icon is clicked and there are no other windows open.
		if (BrowserWindow.getAllWindows().length === 0) createWindow()
	})
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
	if (process.platform !== 'darwin') app.quit()
})

