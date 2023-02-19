import { Team } from "../../../../types/room-state.js"

export function getOpponentTeam(team: Team): Team {
  return team === "one" ? "two" : "one"
}
