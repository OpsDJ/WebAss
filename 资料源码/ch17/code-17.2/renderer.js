const {nodeVersion, chromeVersion, getElectronVersion } = window.versions

document.getElementById('node-version').innerText = nodeVersion
document.getElementById('chrome-version').innerText = chromeVersion
document.getElementById('electron-version').innerText = getElectronVersion()