import { ButtonResponsive } from "../button-responsive.js"
import ChatIcon from "@mui/icons-material/Chat"
import { useTemporaryElement } from "../../custom-hooks/use-temporary-element.js"
import { useState } from "react"
import { AppState, ChatTabId } from "../../../types/main.js"
import { Drawer, SxProps } from "@mui/material"
import { TabGroupChat } from "./tab-group-chat.js"
import ChatGeneral from "./chat-general.js"
import ChatOrator from "./chat-orator.js"

type Props = {
  appState: AppState
}

export function ButtonChat({ appState }: Props) {
  const drawer = useTemporaryElement(false)
  const [selectedTab, setSelectedTab] = useState<ChatTabId>("general")

  let tabContent
  switch (selectedTab) {
    case "general":
      tabContent = <ChatGeneral appState={appState} />
      break
    case "orator":
      tabContent = <ChatOrator appState={appState} />
      break
    //no default
  }

  return (
    <>
      <ButtonResponsive icon={<ChatIcon />} label="Chat" onClick={drawer.display} />
      <Drawer
        variant="temporary"
        anchor="right"
        open={drawer.displayed}
        onClose={drawer.remove}
        PaperProps={{ sx: style_drawer }}
      >
        <>{tabContent}</>
        <TabGroupChat setSelectedTab={setSelectedTab} close={drawer.remove} />
      </Drawer>
    </>
  )
}

const style_drawer: SxProps = {
  flexFlow: "column nowrap",
  justifyContent: "space-between",
  width: "100%",
  height: "100%",
}
