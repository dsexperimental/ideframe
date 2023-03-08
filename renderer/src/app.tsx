import * as React from "react"
import * as ReactDom from "react-dom/client"
import { AppElement } from "./elements/AppElement"
import { TabState } from "./elements/TabView"

//=============================================
// app state
//=============================================

type DocSession = {
    id: string
    lastSavedText?: string
    filePath?: string
    isDirty: boolean
}

let activeDocSession: string | null = null
let docSessions: Record<string,DocSession> = {}

function startDocSession(fileInfo: {data: string, filePath: string} | undefined = undefined) {
    const id = "ds" + getNewInt()
    let docSession: DocSession =  {
        id: id,
        lastSavedText: fileInfo !== undefined ? fileInfo.data : undefined,
        filePath: fileInfo !== undefined ? fileInfo.filePath : undefined, 
        isDirty: false
    }
    docSessions[id] = docSession
    activeDocSession = id
    renderApp()
}

//--------------------------------

function closeDocSession(id: string) {
    if(docSessions[id] !== undefined) {
        let docSession = docSessions[id]
        //-- VERIFY DELETE HERE?? --
        delete docSessions[id]
        //-- DO DELETE HERE --

        if(activeDocSession == id) {
            //clumsy way of reading first key - clean this up
            let firstKey = null
            for(let key in docSessions) {
                firstKey = key
                break
            }
            activeDocSession = firstKey
        }
        renderApp()
    }
    else {
        console.log("Doc Session ID not found: " + id)
    }
}

function selectDocSession(id: string) {
    if(docSessions[id] !== undefined) {
        activeDocSession = id
        renderApp()
    }
    else {
        console.log("Doc Session ID not found: " + id)
    }
}

function newFile() {
    startDocSession()
}

function openFile() {
    window.openSaveApi.openFile().then( result => { 
        if(result !== null) {
            startDocSession(result)
        } 
    }).catch(err => {
        //NEED ERROR HANDLING!
        console.log(err)
    })
}

function saveFile() {
    if(activeDocSession === null) {
        console.log("There is no active session")
        return
    }
    let docSession = docSessions[activeDocSession]

    if(docSession.isDirty) {
        console.log("There is no active session")
        return
    }
}

function saveFileAs() {
    console.log("Implement this!")
}

let nextIntVal = 1
function getNewInt() {
    return nextIntVal++
}

//==============================================
// UI
//==============================================

let element = document.querySelector("#editorMD")
if(element === null ) throw new Error("Document element not found!")

function getTabElement(tabState: TabState, isShowing: boolean) {
    return <div>This is tab {tabState.id}</div>
}

let menuList = [{
    text: "File",
    items: [
        { text: "New", action: newFile},
        { text: "Open", action: openFile},
        { text: "Save", action: () => saveFile},
        { text: "Quit", action: () => console.log("Quit pressed") }
    ]
}]

const tabFunctions = {
    selectTab: selectDocSession,
    closeTab: closeDocSession,
    getTabElement: getTabElement
}

let root = ReactDom.createRoot(element)

function renderApp() {
    const tabStateArray = createTabStateArray()
    const appContent =  (
        <div>
            <AppElement menuList={menuList} tabStateArray={tabStateArray} selectedId={activeDocSession} tabFunctions={tabFunctions} />
        </div>
    )
    root.render(appContent) 
} 

function createTabStateArray() {
    let tabStateArray: TabState[] = []
    for(const key in docSessions) {
        tabStateArray.push(createTabState(docSessions[key]))
    }
    return tabStateArray
}

function createTabState(docSession: DocSession) {
    return {
        id: docSession.id,
        label: docSession.id,
        isDirty: docSession.isDirty,
        type: "Rcode"
    }
}

//initial render
renderApp()



