import { RoomState } from "../../back-end/config/room-state.js"
import { ButtonResponsive } from "./button-responsive.js"
import EditIcon from "@mui/icons-material/Edit"
import { doNothing } from "../../functions/do-nothing.js"

type Props = {
  roomState: RoomState
}

export function ButtonSubmitWord({ roomState }: Props) {
  doNothing(roomState)

  return <ButtonResponsive icon={<EditIcon />} label="Mot" onClick={doNothing} whileDisabled={true} />
}
