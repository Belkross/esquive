import SuccessIcon from "@mui/icons-material/CheckCircle"
import NeutralIcon from "@mui/icons-material/Pageview"
import FailureIcon from "@mui/icons-material/Cancel"
import { RoomState, Team } from "../../../back-end/config/room-state.js"

type Props = {
  team: Team
  roomState: RoomState
}

export function RoundAdvancementVisual({ team, roomState }: Props) {
  const hasSucceededRound = roomState.teams[team].hasSucceededGuess

  switch (hasSucceededRound) {
    case true:
      return <SuccessIcon sx={style_iconSuccess} />
    case false:
      return <FailureIcon sx={style_iconFailure} />
    case undefined:
      return <NeutralIcon sx={style_iconNeutral} />
    // No default
  }
}

const style_iconSuccess = {
  color: "success.main",
  width: "28px",
  height: "28px",
}

const style_iconFailure = {
  color: "error.main",
  width: "28px",
  height: "28px",
}

const style_iconNeutral = {
  color: "text.disabled",
  width: "30px",
  height: " 30px",
}
