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
import { RoomState } from "../../../back-end/config/room-state/room-state.js"

export type ChatInputState = {
  value: string
  validity: boolean
  characterRemaining: number
}

export const chatInitialInputState = {
  value: "",
  validity: false,
  characterRemaining: RoomState.CHAT_MESSAGE_MAX_LENGTH,
}

type Props = {
  appState: AppState
  openSubmitWordModal: FlowlessFunction
}

export function ButtonChat({ appState, openSubmitWordModal }: Props) {
  const [input, setInput] = useState<ChatInputState>(chatInitialInputState)
  const drawer = useTemporaryElement(false)
  const [selectedTab, setSelectedTab] = useState<ChatChannel>("general")

  let tabContent
  switch (selectedTab) {
    case "general":
      tabContent = <ChatGeneral appState={appState} input={input} setInput={setInput} />
      break
    case "orator":
      tabContent = <ChatOrator appState={appState} input={input} setInput={setInput} />
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
          setInput={setInput}
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
