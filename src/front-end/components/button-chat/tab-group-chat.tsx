import { Stack, IconButton, SxProps } from "@mui/material"
import { ChatTabId, FlowlessFunction, setState } from "../../../types/main.js"
import CloseIcon from "@mui/icons-material/Clear"
import { ReactElement } from "react"
import RoomIcon from "@mui/icons-material/Home"
import TeamIcon from "@mui/icons-material/Groups"
import { ButtonResponsive } from "../button-responsive.js"

type Props = {
  setSelectedTab: setState<ChatTabId>
  close: FlowlessFunction
}

type TabData = {
  id: ChatTabId
  label: string
  icon: ReactElement
}

const tabs: TabData[] = [
  { id: "general", label: "Salon", icon: <RoomIcon /> },
  { id: "orator", label: "Équipe", icon: <TeamIcon /> },
  
]

export function TabGroupChat({ setSelectedTab, close }: Props) {
  const handleClick = (id: ChatTabId) => setSelectedTab(id)

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
