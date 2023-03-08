/////////////////////////////////////////////////////////////////////////////////////////////////////

import {contextBridge, ipcRenderer} from 'electron'
import {FileMetaData} from './fileAccess'

contextBridge.exposeInMainWorld('openSaveApi', {
	loadConfig: () => ipcRenderer.invoke("fileAccess:loadConfig"),
	saveFileAs: (fileMetadata: FileMetaData, data: string) => ipcRenderer.invoke("fileAccess:saveFileAs",fileMetadata,data),
	saveFile: (fileMetadata: FileMetaData, data: string) => ipcRenderer.invoke("fileAccess:saveFile",fileMetadata,data),
	openFile: () => ipcRenderer.invoke("fileAccess:openFile"),
	dummy: () => ipcRenderer.invoke("fileAccess:dummy")
})
