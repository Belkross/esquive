import { Stack, IconButton, SxProps } from "@mui/material"
import { FlowlessFunction, MenuTabId, setState } from "../../../types/main.js"
import CloseIcon from "@mui/icons-material/Clear"
import { ReactElement } from "react"
import RoomIcon from "@mui/icons-material/Home"
import TeamIcon from "@mui/icons-material/Groups"
import RuleIcon from "@mui/icons-material/HelpCenter"
import SettingsIcon from "@mui/icons-material/Settings"
import { ButtonResponsive } from "../button-responsive.js"

type Props = {
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

export function TabGroupMenu({ setSelectedTab, close }: Props) {
  const handleClick = (id: MenuTabId) => setSelectedTab(id)

  const list_tab = tabs.map((tab) => {
    return <ButtonResponsive key={tab.id} label={tab.label} icon={tab.icon} onClick={() => handleClick(tab.id)} />
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

const style_tabs: SxProps = {
  position: "fixed",
  width: "100%",
  flexFlow: "row nowrap",
  gap: { xs: 1, sm: 2 },
  alignItems: "center",
  justifyContent: "center",
  bottom: "0",
  left: "0",
  backgroundColor: "background.navBar",
  px: 3,
  py: 1.5,
  boxShadow: 7,
}

const style_buttonClose: SxProps = {
  backgroundColor: "error.main",
  borderColor: "error.main",
}
