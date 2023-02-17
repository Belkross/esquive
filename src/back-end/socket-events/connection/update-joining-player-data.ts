import { RoomState } from "../../config/room-state/room-state.js"

export function updateJoiningPlayerData(roomState: RoomState, browserId: string, username: string) {
  const isNewPlayer = roomState.players[browserId] === undefined

  if (isNewPlayer) roomState.addPlayer(browserId, username)
  else roomState.players[browserId].connected = true
}
