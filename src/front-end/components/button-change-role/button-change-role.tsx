import GuesserIcon from "@mui/icons-material/PersonSearch"
import TalkerIcon from "@mui/icons-material/RecordVoiceOver"
import { AppState } from "../../../types/main.js"
import { Team, Role } from "../../../types/room-state.js"
import { getClientTeam } from "../../../functions/get-client-team.js"
import { ButtonChangeRoleTitle } from "./title-button-change-role.js"
import { TeammatesList } from "./teammate-list.js"
import { Stack, IconButton } from "@mui/material"
import { socket } from "../../config/initialize-socket-io.js"

type Props = {
  appState: AppState
  team: Team
  role: Role
}

export function ButtonChangeRole({ team, role, appState }: Props) {
  const whileDisabled = getWhileDisabled(appState, team)

  const handleClick = () => socket.emit("changeRole", team, role)

  return (
    <Stack sx={style_container}>
      <IconButton aria-label="Changer Role" sx={style_iconButton(team)} onClick={handleClick} disabled={whileDisabled}>
        {role === "guesser" ? <GuesserIcon /> : <TalkerIcon />}
      </IconButton>
      <Stack>
        <ButtonChangeRoleTitle role={role} team={team} />
        <TeammatesList team={team} role={role} appState={appState} />
      </Stack>
    </Stack>
  )
}

function getWhileDisabled(appState: AppState, team: Team) {
  const { roomState, sessionId } = appState
  const roundPhase = roomState.roundPhase
  const duringPreRound = roundPhase === "pre round"
  const duringTrapping = roundPhase === "trapping"

  const clientTeam = getClientTeam(roomState, sessionId)
  const notOpponentTeamButton = clientTeam === team

  const whileActivated = duringPreRound || (duringTrapping && notOpponentTeamButton)

  return !whileActivated
}

const style_container = {
  flexDirection: "row",
  alignItems: "start",
  gap: 2,
}

const style_iconButton = (team: Team) => {
  const color = team === "one" ? "teamOne.main" : "teamTwo.main"
  return {
    backgroundColor: color,
    borderColor: color,
  }
}
