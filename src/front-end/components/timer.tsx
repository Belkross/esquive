import { SxProps, Typography } from "@mui/material"
import { RoomState } from "../../back-end/config/room-state/room-state.js"
import { formatDurationForTimer } from "../../functions/format-duration-for-timer.js"
import { AppState } from "../../types/main.js"
import shape from "../theme/shape.js"

const SHORT_DURATION = 10
type TimerState = "inactive" | "active" | "activeAndShort"

type Props = {
  appState: AppState
}

export function Timer({ appState }: Props) {
  const { roomState } = appState
  const { timer: timeRemaining } = roomState

  const timerState = deduceTimerState(roomState, timeRemaining)
  const duration = formatDurationForTimer(timeRemaining)

  return <Typography sx={style_typography(timerState)}>{duration}</Typography>
}

function deduceTimerState(roomState: RoomState, duration: number): TimerState {
  const { isJudgingTrap, roundAdvancement } = roomState
  const timerIsActive = roundAdvancement === 2 || roundAdvancement === 4 || roundAdvancement === 6

  if (!timerIsActive || isJudgingTrap) return "inactive"
  else if (timerIsActive && duration > SHORT_DURATION) return "active"
  else if (timerIsActive && duration <= SHORT_DURATION) return "activeAndShort"
  else return "inactive"
}

const style_typography = (state: TimerState): SxProps => {
  let color
  switch (state) {
    case "inactive":
      color = "text.primary"
      break
    case "active":
      color = "info.main"
      break
    case "activeAndShort":
      color = "error.main"
      break
    default:
      color = "text.primary"
  }

  return {
    color,
    fontSize: { xs: "28px", md: "31px" },
    fontWeight: "600",
    px: 1,
    borderRadius: `${shape.borderRadius}px`,
    boxShadow: 2,
    borderStyle: shape.borderStyle,
    borderWidth: "2px",
    borderColor: "primary.main",
    boxSizing: "border-box",
  }
}
