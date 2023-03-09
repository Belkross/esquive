import { randomIntFromInterval } from "../../../../functions/random-int-from-interval.js";
const teams = ["one", "two"];
/* If there is only one player in a team, I want to let him the possibility
to test the application */
export function makeSureTeamsHaveOrator() {
    const players = Object.values(this.players);
    for (const team of teams) {
        const teammates = players.filter((player) => player.team === team);
        const nobodyIsTalker = !teammates.some((player) => player.role === "orator");
        const atLeastTwoPlayersInTheTeam = teammates.length >= 2;
        if (nobodyIsTalker && atLeastTwoPlayersInTheTeam)
            randomPlayerBecomeOrator.call(this, teammates);
    }
}
function randomPlayerBecomeOrator(teammates) {
    const teammatesNumber = teammates.length;
    const randomPlayerIndex = randomIntFromInterval(0, teammatesNumber - 1);
    const randomPlayerId = teammates[randomPlayerIndex].sessionId;
    this.players[randomPlayerId].role = "orator";
}
