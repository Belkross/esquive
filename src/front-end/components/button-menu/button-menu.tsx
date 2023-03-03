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
import shape from "../../theme/shape.js"

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
    //no default
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
        <TabGroupMenu selectedTab={selectedTab} setSelectedTab={setSelectedTab} close={drawer.remove} />
      </Drawer>
    </>
  )
}

const style_drawer: SxProps = {
  width: "100%",
  maxWidth: shape.drawerMaxWidth,
  height: "100vh",
  overflow: "hidden",
}
