import { Drawer, SxProps } from "@mui/material"
import { useTemporaryElement } from "../../custom-hooks/use-temporary-element.js"
import { ButtonResponsive } from "../button-responsive.js"
import MenuIcon from "@mui/icons-material/Menu"
import { useState } from "react"
import { MenuMain } from "./menu-main.js"
import { MenuTeam } from "./menu-team.js"
import { MenuRules } from "./menu-rules/menu-rules.js"
import { MenuSettings } from "./menu-settings.js"
import { TabGroupMenu } from "./tab-group-menu.js"
import { AppState, MenuTabId } from "../../../types/main.js"

type Props = {
  appState: AppState
}

export function ButtonMenu({ appState }: Props) {
  const drawer = useTemporaryElement(false)
  const [selectedTab, setSelectedTab] = useState<MenuTabId>("main")

  let tabContent
  switch (selectedTab) {
    case "main":
      tabContent = <MenuMain appState={appState} />
      break
    case "team":
      tabContent = <MenuTeam appState={appState} />
      break
    case "rules":
      tabContent = <MenuRules />
      break
    case "settings":
      tabContent = <MenuSettings appState={appState} closeMenu={drawer.remove} />
      break
  }

  return (
    <>
      <ButtonResponsive icon={<MenuIcon />} label="Menu" onClick={drawer.display} />
      <Drawer
        variant="temporary"
        anchor="left"
        open={drawer.displayed}
        onClose={drawer.remove}
        PaperProps={{ sx: style_drawer }}
      >
        <>{tabContent}</>
        <TabGroupMenu setSelectedTab={setSelectedTab} close={drawer.remove} />
      </Drawer>
    </>
  )
}

const style_drawer: SxProps = {
  flexFlow: "column nowrap",
  justifyContent: "space-between",
  width: "100%",
  height: "100%",
  //paddingBottom: 39, //to make sure content don’t hide behind app bar
  backgroundColor: "background.default",
}



