import { ButtonResponsive } from "../button-responsive.js"
import ChatIcon from "@mui/icons-material/Chat"
import { useTemporaryElement } from "../../custom-hooks/use-temporary-element.js"
import { useState } from "react"
import { AppState, ChatChannel, FlowlessFunction } from "../../../types/main.js"
import { Drawer, SxProps } from "@mui/material"
import { TabGroupChat } from "./tab-group-chat.js"
import shape from "../../theme/shape.js"
import { ChatGeneral } from "./chat-general.js"
import { ChatOrator } from "./chat-orator.js"

type Props = {
  appState: AppState
  openSubmitWordModal: FlowlessFunction
}

export function ButtonChat({ appState, openSubmitWordModal }: Props) {
  const drawer = useTemporaryElement(false)
  const [selectedTab, setSelectedTab] = useState<ChatChannel>("general")

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
        anchor="left"
        open={drawer.displayed}
        onClose={drawer.remove}
        PaperProps={{ sx: style_drawer }}
      >
        <>{tabContent}</>
        <TabGroupChat
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
          close={drawer.remove}
          appState={appState}
          openSubmitWordModal={openSubmitWordModal}
        />
      </Drawer>
    </>
  )
}

const style_drawer: SxProps = {
  width: "100%",
  maxWidth: shape.drawerMaxWidth,
  height: "100%",
}
