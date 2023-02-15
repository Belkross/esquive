import { RoomState } from "../../back-end/config/room-state.js"
import { doNothing } from "../../functions/do-nothing.js"
import { ButtonResponsive } from "./button-responsive.js"
import ChatIcon from "@mui/icons-material/Chat"

type Props = {
  roomState: RoomState
}
export function ButtonChat({ roomState }: Props) {
  doNothing(roomState)
  return <ButtonResponsive icon={<ChatIcon />} label="Chat" onClick={doNothing} />
}
