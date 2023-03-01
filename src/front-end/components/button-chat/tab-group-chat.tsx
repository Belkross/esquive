import { IconButton, SxProps, Stack } from "@mui/material"
import { AppState, ChatChannel, FlowlessFunction, setState } from "../../../types/main.js"
import CloseIcon from "@mui/icons-material/Clear"
import { ReactElement } from "react"
import TalkerIcon from "@mui/icons-material/RecordVoiceOver"
import TeamIcon from "@mui/icons-material/Groups"
import { ButtonResponsive } from "../button-responsive.js"
import { Timer } from "../timer.js"
import { ButtonSubmitWord } from "../button-submit-word/button-submit-word.js"
import { style_tabs } from "../button-menu/tab-group-menu.js"

type Props = {
  setSelectedTab: setState<ChatChannel>
  close: FlowlessFunction
  appState: AppState
}

type TabData = {
  id: ChatChannel
  label: string
  icon: ReactElement
}

const tabs: TabData[] = [
  { id: "general", label: "Général", icon: <TeamIcon /> },
  { id: "orator", label: "Orateur", icon: <TalkerIcon /> },
]

export function TabGroupChat({ setSelectedTab, close, appState }: Props) {
  const handleClick = (id: ChatChannel) => setSelectedTab(id)

  const list_tab = tabs.map((tab) => {
    return <ButtonResponsive key={tab.id} label={tab.label} icon={tab.icon} onClick={() => handleClick(tab.id)} />
  })

  return (
    <Stack component="nav" sx={style_tabs}>
      <Timer appState={appState} />
      <Stack sx={style_stackButtons}>
        <ButtonSubmitWord appState={appState} />
        {list_tab}
        <IconButton aria-label="Fermer" onClick={close} sx={style_buttonClose}>
          <CloseIcon />
        </IconButton>
      </Stack>
    </Stack>
  )
}

const style_stackButtons = {
  flexDirection: "row",
  gap: 1.2,
}

const style_buttonClose: SxProps = {
  backgroundColor: "error.main",
  borderColor: "error.main",
}
