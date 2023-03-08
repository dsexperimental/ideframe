import * as React from "react"
import * as ReactDom from "react-dom/client"
import { AppElement } from "./elements/AppElement"
import { TabState } from "./elements/TabView"


let element = document.querySelector("#editorMD")
if(element === null ) throw new Error("Document element not found!")


//===============================================
let menuList = [{
    text: "File",
    items: [
        { text: "Open", action: () => {
                window.openSaveApi.openFile().then( (result: any) => { 
                    if(result !== null) console.log(result) 
                }).catch(err => console.log(err))
                openTab() 
            }
        },
        { text: "Save", action: () => {
            window.openSaveApi.dummy().then( (result: any) => { 
                console.log(result) 
            }).catch(err => console.log(err))
        } },
        { text: "Quit", action: () => console.log("Quit pressed") }
    ]
}]

let selectedId = "tab1"

let tabStateArray: TabState[] = []
//     {
//         id: "tab1",
//         label: "Tab 1",
//         status: "NA",
//         //iconSrc: string
//         getTabElement: (tabState: TabState, isShowing: boolean) => <div>This is tab 1!</div>
//     },
//     {
//         id: "tab2",
//         label: "Tab 2",
//         status: "NA",
//         //iconSrc: string
//         getTabElement: (tabState: TabState, isShowing: boolean) => <div>This is tab 2!</div>
//     }
// ]


const tabFunctions = {
    selectTab: (tabId: string) => {
        console.log("Tab selected: " + tabId)
        selectedId = tabId
        renderApp()
    },
    closeTab: (tabId: string) => {
        console.log("Tab closed: " + tabId)
        let newTabStateArray: TabState[] = []
        tabStateArray.forEach(tabState => {
            if(tabState.id != tabId) newTabStateArray.push(tabState)
        })
        tabStateArray = newTabStateArray
        renderApp()
    }
}

let nextIntVal = 1
function getNewInt() {
    return nextIntVal++
}

function openTab() {
    let tabName = "Tab " + getNewInt()

    let tabState: TabState = {
        id: tabName!,
        label: tabName!,
        status: "NA",
        //iconSrc: string
        getTabElement: (tabState: TabState, isShowing: boolean) => <div>This is tab '{tabName!}'!</div>
    }
    tabStateArray = tabStateArray.concat([tabState])
    renderApp()
}

let root = ReactDom.createRoot(element)

function renderApp() {
    const appContent =  (
        <div>
            <AppElement menuList={menuList} tabStateArray={tabStateArray} selectedId={selectedId} tabFunctions={tabFunctions} />
        </div>
    )
    root.render(appContent) 
} 


//initial render
renderApp()



