/////////////////////////////////////////////////////////////////////////////////////////////////////

import {contextBridge, ipcRenderer} from 'electron'

contextBridge.exposeInMainWorld('openSaveApi', {
	saveFileAs: ( data: string, filePath: string) => ipcRenderer.invoke("fileAccess:saveFileAs",data,filePath),
	saveFile: ( data: string, filePath: string) => ipcRenderer.invoke("fileAccess:saveFile",data,filePath),
	openFile: () => ipcRenderer.invoke("fileAccess:openFile"),
	dummy: () => ipcRenderer.invoke("fileAccess:dummy")
})
