import { getClientTeam } from "../../../functions/get-client-team.js"
import { AppState } from "../../../types/main.js"
import { ButtonThumb } from "../button-thumb.js"

type Props = {
  appState: AppState
  trapIndex: number
  voteType: boolean
}

export function ButtonVoteTrap({ voteType, trapIndex, appState }: Props) {
  const { roomState, browserId } = appState
  const clientTeam = getClientTeam(roomState, browserId)

  const componentProps = {
    isThumbUp: voteType,
    clientVote: roomState.players[clientTeam].trapOpinions[trapIndex],
    votersUsername: getVotersUsername(appState, voteType, trapIndex),
    small: true
    //onClick: (boolean) => () => socket.emit("submitTrapOpinion", trapIndex, boolean),
  }

  return <ButtonThumb {...componentProps} />
}

function getVotersUsername(appState: AppState, voteType: boolean, trapIndex: number) {
  const { roomState, browserId } = appState
  const clientTeam = getClientTeam(roomState, browserId)
  const allPlayers = Object.values(roomState.players)

  const clientTeammatesWhoPressedTheButton = allPlayers.filter((player) => {
    const isClientMate = player.team === clientTeam
    const pressedTheButton = player.trapOpinions[trapIndex] === voteType

    return isClientMate && pressedTheButton
  })

  return clientTeammatesWhoPressedTheButton.map((player) => player.username)
}
