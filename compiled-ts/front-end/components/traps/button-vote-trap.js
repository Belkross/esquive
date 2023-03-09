import { jsx as _jsx } from "react/jsx-runtime";
import { getPlayerTeam } from "../../../functions/get-player-team.js";
import { socket } from "../../config/initialize-socket-io.js";
import { ButtonThumb } from "../button-thumb.js";
export function ButtonVoteTrap({ voteType, trap, appState }) {
    const componentProps = {
        isThumbUp: voteType,
        clientVote: getClientVote(appState, trap),
        votersUsername: getVotersUsername(appState, voteType, trap),
        small: true,
        handleClick: (boolean) => socket.emit("submitTrapOpinion", trap, boolean),
    };
    return _jsx(ButtonThumb, { ...componentProps });
}
function getClientVote(appState, trap) {
    const { roomState, sessionId } = appState;
    const clientTeam = getPlayerTeam(roomState, sessionId);
    return roomState.teams[clientTeam].traps[trap].opinions[sessionId];
}
function getVotersUsername(appState, voteType, trap) {
    const { roomState, sessionId } = appState;
    const clientTeam = getPlayerTeam(roomState, sessionId);
    const opinionEntries = Object.entries(roomState.teams[clientTeam].traps[trap].opinions);
    const correspondingEntries = opinionEntries.filter((opinion) => {
        const opinionValue = opinion[1];
        return opinionValue === voteType;
    });
    const sessions = correspondingEntries.map((entrie) => {
        return entrie[0];
    });
    return sessions.map((sessionId) => roomState.players[sessionId].username);
}
