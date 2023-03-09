import { PlayerData } from "../player-data.js";
export function addPlayer(sessionId, username) {
    const playerData = new PlayerData(sessionId, username);
    const isCreatorOfTheRoom = Object.keys(this.players).length === 0;
    if (isCreatorOfTheRoom)
        playerData.isAdmin = true;
    this.players[sessionId] = playerData;
}
