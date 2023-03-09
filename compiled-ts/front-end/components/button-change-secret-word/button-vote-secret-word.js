import { jsx as _jsx } from "react/jsx-runtime";
import { getPlayerTeam } from "../../../functions/get-player-team.js";
import { ButtonThumb } from "../button-thumb.js";
import { socket } from "../../config/initialize-socket-io.js";
export function ButtonVoteSecretWord({ voteType, appState }) {
    const componentProps = {
        isThumbUp: voteType,
        clientVote: getClientVote(appState),
        votersUsername: getVotersUsername(appState, voteType),
        handleClick: (vote) => socket.emit("submitSecretWordOpinion", vote),
    };
    return _jsx(ButtonThumb, { ...componentProps });
}
function getClientVote(appState) {
    const { roomState, sessionId } = appState;
    const clientTeam = getPlayerTeam(roomState, sessionId);
    return roomState.teams[clientTeam].secretWord.opinions[sessionId];
}
function getVotersUsername(appState, voteType) {
    const { roomState, sessionId } = appState;
    const clientTeam = getPlayerTeam(roomState, sessionId);
    const opinionEntries = Object.entries(roomState.teams[clientTeam].secretWord.opinions);
    const correspondingEntries = opinionEntries.filter((opinion) => {
        const opinionValue = opinion[1];
        return opinionValue === voteType;
    });
    const sessions = correspondingEntries.map((entrie) => {
        return entrie[0];
    });
    return sessions.map((sessionId) => roomState.players[sessionId].username);
}
