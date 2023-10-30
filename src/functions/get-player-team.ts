import { RoomState } from "../back-end/config/room-state/room-state.js"
import { Team } from "../types/room-state.js"

export function getPlayerTeam(roomState: RoomState, sessionId: string): Team {
  return roomState.players[sessionId].team
}
