import { Stack } from "@mui/material"
import { AppState, ChatChannel, FlowlessFunction, setState } from "../../../types/main.js"
import { ReactElement } from "react"
import TalkerIcon from "@mui/icons-material/RecordVoiceOver"
import TeamIcon from "@mui/icons-material/Groups"
import { ButtonResponsive } from "../button-responsive.js"
import { Timer } from "../timer.js"
import { ButtonSubmitWord } from "../button-submit-word/button-submit-word.js"
import { style_tabs } from "../button-menu/tab-group-menu.js"
import ButtonCloseElement from "../button-close-element.js"

type Props = {
  selectedTab: ChatChannel
  setSelectedTab: setState<ChatChannel>
  close: FlowlessFunction
  appState: AppState
  openSubmitWordModal: FlowlessFunction
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

export function TabGroupChat({ selectedTab, setSelectedTab, close, appState, openSubmitWordModal }: Props) {
  const handleClick = (id: ChatChannel) => setSelectedTab(id)

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
      <Timer appState={appState} />
      <Stack sx={style_stackButtons}>
        <ButtonSubmitWord appState={appState} openModal={openSubmitWordModal} />
        {list_tab}
        <ButtonCloseElement onClick={close} />
      </Stack>
    </Stack>
  )
}

const style_stackButtons = {
  flexDirection: "row",
  gap: 1.2,
}
