import { RoomState } from "../back-end/config/room-state/room-state.js"

export function getClientTeam(roomState: RoomState, sessionId: string) {
  return roomState.players[sessionId].team
}
