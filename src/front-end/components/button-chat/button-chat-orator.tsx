import { ButtonResponsive } from "../button-responsive.js"
import { useTemporaryElement } from "../../custom-hooks/use-temporary-element.js"
import { useEffect, useState } from "react"
import { AppState, FlowlessFunction } from "../../../types/main.js"
import { Badge, Drawer, SxProps } from "@mui/material"
import { NavbarChatOrator } from "./navbar-chat-orator.js"
import shape from "../../theme/shape.js"
import { ChatOrator } from "./chat-orator.js"
import OratorIcon from "@mui/icons-material/RecordVoiceOver"
import { ChatInputState, chatInitialInputState } from "./button-chat-general.js"

type Props = {
  appState: AppState
  openSubmitWordModal: FlowlessFunction
}

export function ButtonChatOrator({ appState, openSubmitWordModal }: Props) {
  const [badge, setBadge] = useState({ notification: 0, lastMessage: Date.now() })
  const [input, setInput] = useState<ChatInputState>(chatInitialInputState)
  const drawer = useTemporaryElement(false)

  const handleClick = () => {
    setBadge((prevBadge) => ({ ...prevBadge, notification: 0 }))
    drawer.display()
  }

  const { oratorMessages } = appState.roomState
  const lastMessageDate = oratorMessages[oratorMessages.length - 1].date
  const lastMessageAuthor = oratorMessages[oratorMessages.length - 1].author
  const newMessageReceived = lastMessageDate > badge.lastMessage
  const newMessageIsFromPlayer = lastMessageAuthor !== "Esquive"
  const hasToBeNotified = newMessageReceived && !drawer.displayed && newMessageIsFromPlayer
  useEffect(() => {
    if (newMessageReceived)
      setBadge((prevBadge) => ({
        lastMessage: lastMessageDate,
        notification: hasToBeNotified ? prevBadge.notification + 1 : prevBadge.notification,
      }))
  }, [hasToBeNotified, lastMessageDate, newMessageReceived])

  return (
    <>
      <Badge badgeContent={badge.notification} color="warning">
        <ButtonResponsive icon={<OratorIcon />} label="Orateur" onClick={handleClick} />
      </Badge>
      <Drawer
        variant="temporary"
        anchor="left"
        open={drawer.displayed}
        onClose={drawer.remove}
        PaperProps={{ sx: style_drawer }}
      >
        <ChatOrator appState={appState} input={input} setInput={setInput} />
        <NavbarChatOrator closeDrawer={drawer.remove} appState={appState} openSubmitWordModal={openSubmitWordModal} />
      </Drawer>
    </>
  )
}

const style_drawer: SxProps = {
  width: "100%",
  maxWidth: shape.drawerMaxWidth,
  height: "100%",
}
