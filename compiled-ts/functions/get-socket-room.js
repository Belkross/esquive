export function getSocketRoom(server) {
    const { sessions, rooms, sessionId } = server;
    const roomName = sessions.get(sessionId).roomName;
    const roomState = rooms.get(roomName);
    return { roomName, roomState };
}
