import { ButtonResponsive } from "../button-responsive.js"
import ChatIcon from "@mui/icons-material/Chat"
import { useTemporaryElement } from "../../custom-hooks/use-temporary-element.js"
import { useState } from "react"
import { AppState, ChatChannel } from "../../../types/main.js"
import { Drawer, SxProps } from "@mui/material"
import { TabGroupChat } from "./tab-group-chat.js"
import { Chat } from "./chat.js"
import shape from "../../theme/shape.js"

type Props = {
  appState: AppState
}

export function ButtonChat({ appState }: Props) {
  const drawer = useTemporaryElement(false)
  const [selectedTab, setSelectedTab] = useState<ChatChannel>("general")
  const { roomState } = appState

  let tabContent
  switch (selectedTab) {
    case "general":
      tabContent = <Chat channel="general" messages={roomState.generalMessages} appState={appState} />
      break
    case "orator":
      tabContent = <Chat channel="orator" messages={roomState.oratorMessages} appState={appState} />
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
