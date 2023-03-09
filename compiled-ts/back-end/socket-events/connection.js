import secretWordList from "../../assets/secret-word-list.js";
const environment = process.env.NODE_ENV;
export function connection(server) {
    const { io, socket, sessions, rooms, sessionId } = server;
    const { username, roomName } = sessions.get(sessionId);
    const roomDoesNotExistYet = rooms.get(roomName) === undefined;
    if (environment === "development")
        logSocketEvents(server, username);
    let roomState;
    if (roomDoesNotExistYet) {
        roomState = rooms.add(roomName, secretWordList);
        roomState.addPlayer(sessionId, username);
    }
    else {
        roomState = rooms.get(roomName);
        updateJoiningPlayerData(roomState, sessionId, username);
        io.to(roomName).emit("roomStateUpdate", roomState);
    }
    socket.join(roomName);
    socket.emit("joinRoom", sessionId, roomState);
}
function updateJoiningPlayerData(roomState, sessionId, username) {
    const isNewPlayer = roomState.players[sessionId] === undefined;
    if (isNewPlayer)
        roomState.addPlayer(sessionId, username);
    else
        roomState.players[sessionId].connected = true;
}
function logSocketEvents(server, username) {
    server.socket.onAny((eventName, ...args) => {
        console.log(`${username}: ${eventName}`, args);
    });
}
