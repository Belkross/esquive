import { RoomState } from "../back-end/config/room-state.js"

export function getClientTeam(roomState: RoomState, browserId: string) {
  return roomState.players[browserId].team
}
