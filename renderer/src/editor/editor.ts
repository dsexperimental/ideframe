import { TabState } from "../appTypes"

export function getEditor(tabState: TabState, data: string, element: HTMLDivElement) {
    let editorElement = document.createElement("textarea")
    editorElement.value = data
    element.appendChild(editorElement)

    let editor = {
        getData: () => {
            return editorElement.value
        },
        destroy: () => {
            element.removeChild(editorElement)
            //nothing to destroy for now
        }
    }
    return editor
}
