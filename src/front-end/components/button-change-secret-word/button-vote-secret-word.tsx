import { AppState } from "../../../types/main.js"
import { RoomState } from "../../../back-end/config/room-state.js"
import { getClientTeam } from "../../../functions/get-client-team.js"
import { ButtonThumb } from "../button-thumb.js"

type Props = {
  appState: AppState
  voteType: boolean
}

export function ButtonVoteSecretWord({ voteType, appState }: Props) {
  const { roomState, browserId } = appState

  const componentProps = {
    isThumbUp: voteType,
    clientVote: roomState.players[browserId].secretWordOpinion,
    votersUsername: getVotersUsername(roomState, browserId, voteType),
    //onClick: (boolean) => () => socket.emit("submitSecretWordOpinion", boolean),
  }

  return <ButtonThumb {...componentProps} />
}

function getVotersUsername(roomState: RoomState, browserId: string, voteType: boolean) {
  const allPlayers = Object.values(roomState.players)
  const clientTeam = getClientTeam(roomState, browserId)

  const clientTeammatesWhoPressedTheButton = allPlayers.filter((player) => {
    const isClientMate = player.team === clientTeam
    const pressedTheButton = player.secretWordOpinion === voteType

    return isClientMate && pressedTheButton
  })

  return clientTeammatesWhoPressedTheButton.map((player) => player.username)
}
