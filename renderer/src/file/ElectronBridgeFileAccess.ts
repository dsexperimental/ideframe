
export interface FileMetaData {
    name: string,
    path: string
}

export type OnOpen = (err: Error, data: string, fileMetaData: FileMetaData) => void
export type OnSave = (err: Error, success: boolean, fileMetaData: FileMetaData) => void

/* 
 * This class provides file open and save in electron.
 */
export class ElectronBridgeFileAccess {
    
    //========================================
    // Public
    //========================================
    
    constructor() {}
    
    /**
     * This method returns fileMetadata appropriate for a new workspace.
     */
    getNewFileMetadata() {
        return {};
    }
    
    /**
     * This method returns true if the workspace has an existing file to which 
     * is can be saved without opening a save dialog. 
     */
    directSaveOk(fileMetadata: FileMetaData) {
        return ((fileMetadata)&&(fileMetadata.path));
    }

    /**  This method shows a file open dialog and then opens the 
     * selected file. */
    openFile() {
        //use the context bridge api
        return window.openSaveApi.openFile()
    }

    /** This method shows a save dialog and then saves to the 
     * selected file. */
    saveFileAs(fileMetaData: FileMetaData, data: string, onSave: OnSave) {
        window.openSaveApi.saveFileAs(fileMetaData, data, onSave)
    }

    /** This method directly saves the file to the given file location. */
    saveFile(fileMetaData: FileMetaData, data: string, onSave: OnSave) {
        
		if((fileMetaData.name !== undefined)&&(fileMetaData.path !== undefined)) {
            //make sure we have file metadata
            window.openSaveApi.saveFile(fileMetaData,data,onSave);
        }
        else {
            window.openSaveApi.saveFileAs(fileMetaData,data,onSave)
        }
    }

}

