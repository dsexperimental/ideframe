import * as React from 'react'
import { MenuBar } from './MenuBar'
import { TabView } from './TabView'
import { MenuProps} from './SelectMenu'
import { TabState, TabFunctions } from '../appTypes'

interface AppProp {
    menuList: MenuProps[]
    selectedId: string | null
    tabStateArray: TabState[]
    tabFunctions: TabFunctions
}

export function AppElement({menuList, tabStateArray, selectedId, tabFunctions}: AppProp) {
    return (
        <>
            <MenuBar menuList={menuList}  />
            <TabView tabStateArray={tabStateArray} selectedId={selectedId} tabFunctions={tabFunctions} />
        </>
    )

}
