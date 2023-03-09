

export interface IOpenSaveApi {
  saveFileAs: (data: string, filePath: string | undefined) => Promise<string>,
  saveFile: (data: string, filePath: string) => Promise<string>,
  openFile: () => Promise<{data: string, filePath: string} | null>
}

declare global {
  interface Window {
    openSaveApi: IOpenSaveApi
  }
}