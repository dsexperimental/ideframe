
import { FileMetaData, OnOpen, OnSave} from "../src/file/ElectronBridgeFileAccess"

export interface IOpenSaveApi {
  loadConfig: (onOpen: OnOpen) => void
  saveFileAs: (fileMetadata: FileMetaData, data: string, onSave: OnSave) => void,
  saveFile: (fileMetadata: FileMetaData, data: string, onSave: OnSave) => void,
  openFile: () => Promise<{data: string, filePath: string} | null>
  dummy: () => Promise<number>
}

declare global {
  interface Window {
    openSaveApi: IOpenSaveApi
  }
}