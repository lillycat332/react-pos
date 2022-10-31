const { app, BrowserWindow, dialog } = require('electron');
// const smalltalk = require('smalltalk/bundle');
let appUserDataPath = app.getPath('userData');
const nodeFs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const { Worker } = require('worker_threads');

function createWindow() {
	// Create the browser window.
	const mainWindow = new BrowserWindow({
		width: 1024,
		height: 768,
		titleBarStyle: 'hiddenInset',
		title: "Triangle POS",
		nodeIntegrationInWorker: true
	})

	mainWindow.setMenuBarVisibility(false)
	// mainWindow.setKiosk(true)
	mainWindow.setWindowButtonVisibility(false)

	const confPath = path.join(appUserDataPath, 'config.json');
	const confExists = nodeFs.existsSync(confPath);

	if (!confExists) {
		nodeFs.writeFileSync(confPath, JSON.stringify({
			"server": {
				"port": 3000,
				"host": "localhost",
				"protocol": "http"
			},
		}));
	}

	const confData = JSON.parse(nodeFs.readFileSync(confPath, 'utf8'))
	let server = confData.server

	console.log(server);

	// Collate the information for the server
	const exeName = process.platform === 'win32' ? 'hs-pos.exe' : 'hs-pos';
	const serverPath = path.join(__dirname, 'bin', exeName);
	console.log(serverPath)
	const port = server.port;
	const dbPath = path.join(appUserDataPath, 'store.db');
	// Launch a background thread to run the server on
	const worker = new Worker(
		new URL('./serve.js', import.meta.url)
	);

	// Tell the worker to start the server.
	worker.postMessage(
		JSON.stringify({
			workerData: {
				port: server.port,
				dbPath: dbPath,
				quiet: true,
				binary: serverPath
			}
		})
	);

	const url = 'http://' + server.host + ':' + server.port

	mainWindow.loadURL(url);
}

// Create window on electron intialization
app.whenReady().then(() => {
	createWindow()

	app.on('activate', function () {
		// On macOS it's common to re-create a window in the app when the
		// dock icon is clicked and there are no other windows open.
		if (BrowserWindow.getAllWindows().length === 0) createWindow()
	})
})

// Quit when all windows are closed (except on macOS)
app.on('window-all-closed', function () {
	if (process.platform !== 'darwin') app.quit()
})

