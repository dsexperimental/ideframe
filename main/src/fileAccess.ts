/////////////////////////////////////////////////////////////////////////////////////////////////////

import {dialog} from 'electron'

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

export interface FileMetaData {
	name?: string,
	path?: string,
	folder?: string
}
  
export type OnOpen = (err: Error, data: string, fileMetadata: FileMetaData) => void
export type OnSave = (err: Error, success: boolean, fileMetadata: FileMetaData) => void

//================================
// File Access API
//================================

/** This loads the config file as ./config.json. onOpen has the args (err,data). Data is null for no config. */
export function loadConfig(event: any, onOpen: OnOpen) {
	var fs = require('fs');
	
	//load file if it exists
	if(fs.existsSync(CONFIG_FILE_PATH)) {             
		fs.readFile(CONFIG_FILE_PATH,onOpen);
	}
	else { 
		//if there is no config file, just return an "empty" promise
		onOpen(null,"",null);
	}
}

/** Saves file; onSave has on argument, the new metadata. If it is null the file was not saved. */
export function saveFileAs(event: any, fileMetadata: FileMetaData, data: string, onSave: OnSave) {
	//show file save dialog
	//const {dialog} = require('electron')
	let options = (fileMetadata && fileMetadata.path) ? {defaultPath: fileMetadata.path} : {};
	var fileSavePromise = dialog.showSaveDialog(options);
	fileSavePromise.then( dialogResult => {
		if((!dialogResult.canceled)&&(dialogResult.filePath)) {
			//save file to the given location
			var updatedFileMetadata = createFileMetaData(dialogResult.filePath);
			saveFileImpl(updatedFileMetadata,data,onSave);
		}
		else {
			onSave(null,false,null);
		}
	})
	.catch(err => {
		onSave(err,false,null);
	})
}

/** Saves file; onSave has on argument, the new metadata. If it is null the file was not saved. */
export function saveFile(event: any, fileMetadata: FileMetaData, data: string, onSave: OnSave)  {

	//show an alert dialog as a precaution to tell user we are writing to file system
	//const {dialog} = require('electron')

	let options = {
		type: "question",
		message: "Save to file location: " + createDisplayPath(fileMetadata) + "?",
		buttons: ["OK","Cancel"]
	}
	var fileOpenPromise = dialog.showMessageBox(options);

	fileOpenPromise.then( result => {
		if(result.response == 0) {
			saveFileImpl(fileMetadata,data,onSave);
		}
		else {
			onSave(null,false,null);
		}
	}).catch(err => {
		onSave(err,false,null);
	});
}

/** This opens a file. the argument onOpen is the callback with the args (err,data,fileMetadata). All null on not opened */
export function openFile(event: any) {
	var fileOpenPromise = dialog.showOpenDialog({properties: ['openFile']})
	return fileOpenPromise.then( fileOpenResult => {
		if((!fileOpenResult.canceled)&&(fileOpenResult.filePaths.length > 0)) {
			const fileMetaData = createFileMetaData(fileOpenResult.filePaths[0])
			const {readFile} = require('node:fs/promises');
			return readFile(fileMetaData.path,'utf8').then( data => {
				return {success: true, data, fileMetaData}
			})
		}
		else {
			return Promise.resolve(null)
		}
	})
	.catch(err => {
		return Promise.reject(err)
	});
	
}

//==================================
// Internal
//==================================


let CONFIG_FILE_PATH = "./config.json";

/** This method saves the file to the given file */
function saveFileImpl(fileMetadata: FileMetaData, data: string, onSave: OnSave) {
	var onComplete = function(err: Error) {
		if(onSave) {
			let fileSaved = err ? false : true;
			onSave(err,fileSaved,fileMetadata);
		}
	}

	var fs = require('fs');
	fs.writeFile(fileMetadata.path,data,onComplete);
}

function createFileMetaData(path: string) {
	return {"path":path};
} 

function createDisplayPath(fileMetadata: FileMetaData) {
    return fileMetadata.path;
}

