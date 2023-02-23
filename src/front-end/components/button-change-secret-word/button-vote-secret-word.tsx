import { AppState } from "../../../types/main.js"
import { getClientTeam } from "../../../functions/get-client-team.js"
import { ButtonThumb } from "../button-thumb.js"
import { socket } from "../../config/initialize-socket-io.js"

type Props = {
  appState: AppState
  voteType: boolean
}

export function ButtonVoteSecretWord({ voteType, appState }: Props) {
  const componentProps = {
    isThumbUp: voteType,
    clientVote: getClientVote(appState),
    votersUsername: getVotersUsername(appState, voteType),
    handleClick: (vote: boolean) => socket.emit("submitSecretWordOpinion", vote),
  }

  return <ButtonThumb {...componentProps} />
}

function getClientVote(appState: AppState) {
  const { roomState, sessionId } = appState
  const clientTeam = getClientTeam(roomState, sessionId)

  return roomState.teams[clientTeam].secretWord.opinions[sessionId]
}

function getVotersUsername(appState: AppState, voteType: boolean) {
  const { roomState, sessionId } = appState
  const clientTeam = getClientTeam(roomState, sessionId)

  const opinionEntries = Object.entries(roomState.teams[clientTeam].secretWord.opinions)
  const correspondingEntries = opinionEntries.filter((opinion) => {
    const opinionValue = opinion[1]
    return opinionValue === voteType
  })
  const sessions = correspondingEntries.map((entrie) => {
    return entrie[0]
  })

  return sessions.map((sessionId) => roomState.players[sessionId].username)
}
