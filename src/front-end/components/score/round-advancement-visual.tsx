import SuccessIcon from "@mui/icons-material/CheckCircle"
import TrappedIcon from "@mui/icons-material/Error"
import CircleIcon from "@mui/icons-material/Circle"
import FailureIcon from "@mui/icons-material/Cancel"
import { Team } from "../../../types/room-state.js"
import { Stack, SxProps } from "@mui/material"
import { AppState } from "../../../types/main.js"
import { RoomState } from "../../../back-end/config/room-state/room-state.js"

type Event = "slot" | "fail" | "trapped" | "success"

type Props = {
  team: Team
  appState: AppState
}

export function RoundAdvancementVisual({ team, appState }: Props) {
  const { roomState } = appState

  const eventSlots = createEventSlots(roomState)
  const teamEvents = writeTeamEvents(roomState, eventSlots, team)

  const list = teamEvents.map((event, index) => {
    switch (event) {
      case "slot":
        return <CircleIcon key={index} sx={style_iconNeutral(roomState.roundPhase === `guessing ${team}`)} />
        break

      case "fail":
        return <FailureIcon key={index} sx={style_iconFailure} />
        break

      case "trapped":
        return <TrappedIcon key={index} sx={style_iconFailure} />
        break

      case "success":
        return <SuccessIcon key={index} sx={style_iconSuccess} />
        break

      default:
        return <CircleIcon key={index} />
    }
  })

  return <Stack sx={style_container}>{list}</Stack>
}

function createEventSlots(roomState: RoomState): Event[] {
  const numberOfAttemptProvided = roomState.guessAttemptsProvided
  const slots: Event[] = []

  for (let slot = 0; slot < numberOfAttemptProvided; ++slot) {
    slots.push("slot")
  }

  return slots
}

function writeTeamEvents(roomState: RoomState, slots: Event[], team: Team) {
  const numberOfAttemptProvided = roomState.guessAttemptsProvided
  const teamSucceededRound = roomState.teams[team].hasSucceededGuess
  const teamHasBeenTrapped = roomState.teams[team].trapped
  const guessAttemptUsed = numberOfAttemptProvided - roomState.teams[team].guessAttemptsRemaining
  const numberOfFailedGuess = teamSucceededRound ? guessAttemptUsed - 1 : guessAttemptUsed

  const arrayOfEvents = [...slots]
  for (let slot = 0; slot < numberOfFailedGuess; ++slot) {
    arrayOfEvents[slot] = "fail"
  }

  if (teamSucceededRound) {
    arrayOfEvents[guessAttemptUsed - 1] = "success"
  } else if (teamHasBeenTrapped) {
    arrayOfEvents[guessAttemptUsed] = "trapped"
  }

  return arrayOfEvents
}

const style_container: SxProps = {
  flexFlow: "row nowrap",
}

const size = "20px"

const style_iconSuccess: SxProps = {
  color: "success.main",
  width: size,
  height: size,
}

const style_iconFailure: SxProps = {
  color: "warning.main",
  width: size,
  height: size,
}

const style_iconNeutral = (playing: boolean): SxProps => {
  return {
    color: playing ? "primary.light" : "text.disabled",
    width: size,
    height: size,
  }
}
