import { Stack, IconButton, SxProps } from "@mui/material"
import { FlowlessFunction, MenuTabId, setState } from "../../../types/main.js"
import CloseIcon from "@mui/icons-material/Clear"
import { ReactElement } from "react"
import RoomIcon from "@mui/icons-material/Home"
import TeamIcon from "@mui/icons-material/Groups"
import RuleIcon from "@mui/icons-material/HelpCenter"
import SettingsIcon from "@mui/icons-material/Settings"
import { ButtonResponsive } from "../button-responsive.js"
import shape from "../../theme/shape.js"

type Props = {
  selectedTab: MenuTabId
  setSelectedTab: setState<MenuTabId>
  close: FlowlessFunction
}

type TabData = {
  id: MenuTabId
  label: string
  icon: ReactElement
}

const tabs: TabData[] = [
  { id: "main", label: "Salon", icon: <RoomIcon /> },
  { id: "team", label: "Équipe", icon: <TeamIcon /> },
  { id: "rules", label: "Règles", icon: <RuleIcon /> },
  { id: "settings", label: "Réglages", icon: <SettingsIcon /> },
]

export function TabGroupMenu({ selectedTab, setSelectedTab, close }: Props) {
  const handleClick = (id: MenuTabId) => setSelectedTab(id)

  const list_tab = tabs.map((tab) => {
    return (
      <ButtonResponsive
        key={tab.id}
        label={tab.label}
        icon={tab.icon}
        onClick={() => handleClick(tab.id)}
        selected={selectedTab === tab.id}
      />
    )
  })

  return (
    <Stack component="nav" sx={style_tabs}>
      {list_tab}
      <IconButton aria-label="Fermer" onClick={close} sx={style_buttonClose}>
        <CloseIcon />
      </IconButton>
    </Stack>
  )
}

export const style_tabs: SxProps = {
  flexFlow: "row wrap",
  justifyContent: "center",
  alignItems: "center",
  gap: { xs: 1, sm: 2 },
  flexShrink: 0,

  minHeight: shape.appBarHeight,
  backgroundColor: "background.navBar",
  px: 3,
  py: 1.5,
  zIndex: 2,
  boxShadow: 7,

  borderTopColor: "background.border",
  borderTopWidth: shape.borderWidth,
  borderTopStyle: shape.borderStyle,
}

const style_buttonClose: SxProps = {
  backgroundColor: "error.main",
  borderColor: "error.main",
}
