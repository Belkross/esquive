import { AppState } from "../../../types/main.js"
import { Team, Role } from "../../../types/room-state.js"
import { getPlayerTeam } from "../../../functions/get-player-team.js"
import { ButtonChangeRoleTitle } from "./title-button-change-role.js"
import { TeammatesList } from "./teammate-list.js"
import { Stack, Button } from "@mui/material"
import { socket } from "../../config/initialize-socket-io.js"

type Props = {
  appState: AppState
  team: Team
  role: Role
}

export function ButtonChangeRole({ team, role, appState }: Props) {
  const whileActivated = getWhileActivated(appState, team)
  const whileDisplayed = getWhileDisplayed(appState)

  const handleClick = () => socket.emit("changeRole", team, role)

  return (
    <Stack sx={style_container}>
      {whileDisplayed && (
        <Button sx={style_button(team)} onClick={handleClick} disabled={!whileActivated}>
          Rejoindre
        </Button>
      )}
      <Stack>
        <ButtonChangeRoleTitle role={role} team={team} />
        <TeammatesList team={team} role={role} appState={appState} />
      </Stack>
    </Stack>
  )
}

function getWhileActivated(appState: AppState, team: Team) {
  const { roomState, sessionId } = appState
  const roundPhase = roomState.roundPhase
  const duringPreRound = roundPhase === "pre round"
  const duringTrapping = roundPhase === "trapping"

  const clientTeam = getPlayerTeam(roomState, sessionId)
  const notOpponentTeamButton = clientTeam === team

  return duringPreRound || (duringTrapping && notOpponentTeamButton)
}

function getWhileDisplayed(appState: AppState) {
  const roundPhase = appState.roomState.roundPhase
  const duringPreRound = roundPhase === "pre round"
  const duringTrapping = roundPhase === "trapping"

  return duringPreRound || duringTrapping
}

const style_container = {
  flexDirection: "row",
  alignItems: "start",
  gap: 2,
}

const style_button = (team: Team) => {
  const color = `team.${team}`

  return {
    backgroundColor: color,
    borderColor: color,
    padding: 1,
  }
}
