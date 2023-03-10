import { Badge, Drawer, SxProps } from "@mui/material"
import { useEffect, useState } from "react"
import { AppState } from "../../../types/main.js"
import { useTemporaryElement } from "../../custom-hooks/use-temporary-element.js"
import shape from "../../theme/shape.js"
import { ButtonResponsive } from "../button-responsive.js"
import { ChatGeneral } from "./chat-general.js"
import ChatIcon from "@mui/icons-material/Chat"
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
}

export function ButtonChatGeneral({ appState }: Props) {
  const [badge, setBadge] = useState({ notification: 0, lastMessage: Date.now() })
  const [input, setInput] = useState<ChatInputState>(chatInitialInputState)
  const drawer = useTemporaryElement(false)

  const handleClick = () => {
    setBadge((prevBadge) => ({ ...prevBadge, notification: 0 }))
    drawer.display()
  }

  const { generalMessages } = appState.roomState
  const lastMessageDate = generalMessages[generalMessages.length - 1].date
  const lastMessageAuthor = generalMessages[generalMessages.length - 1].author
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
        <ButtonResponsive icon={<ChatIcon />} label="Général" onClick={handleClick} />
      </Badge>
      <Drawer
        variant="temporary"
        anchor="left"
        open={drawer.displayed}
        onClose={drawer.remove}
        PaperProps={{ sx: style_drawer }}
      >
        <ChatGeneral appState={appState} input={input} setInput={setInput} closeDrawer={drawer.remove} />
      </Drawer>
    </>
  )
}

const style_drawer: SxProps = {
  width: "100%",
  maxWidth: shape.drawerMaxWidth,
  height: "100%",
}
