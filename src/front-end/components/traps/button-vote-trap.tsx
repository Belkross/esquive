import { getPlayerTeam } from "../../../functions/get-player-team.js"
import { AppState } from "../../../types/main.js"
import { socket } from "../../config/initialize-socket-io.js"
import { ButtonThumb } from "../button-thumb.js"

type Props = {
  appState: AppState
  trap: string
  voteType: boolean
}

export function ButtonVoteTrap({ voteType, trap, appState }: Props) {
  const componentProps = {
    isThumbUp: voteType,
    clientVote: getClientVote(appState, trap),
    votersUsername: getVotersUsername(appState, voteType, trap),
    small: true,
    handleClick: (boolean: boolean) => socket.emit("submitTrapOpinion", trap, boolean),
  }

  return <ButtonThumb {...componentProps} />
}

function getClientVote(appState: AppState, trap: string) {
  const { roomState, sessionId } = appState
  const clientTeam = getPlayerTeam(roomState, sessionId)
  return roomState.teams[clientTeam].traps[trap].opinions[sessionId]
}

function getVotersUsername(appState: AppState, voteType: boolean, trap: string) {
  const { roomState, sessionId } = appState
  const clientTeam = getPlayerTeam(roomState, sessionId)

  const opinionEntries = Object.entries(roomState.teams[clientTeam].traps[trap].opinions)
  const correspondingEntries = opinionEntries.filter((opinion) => {
    const opinionValue = opinion[1]
    return opinionValue === voteType
  })
  const sessions = correspondingEntries.map((entrie) => {
    return entrie[0]
  })

  return sessions.map((sessionId) => roomState.players[sessionId].username)
}
