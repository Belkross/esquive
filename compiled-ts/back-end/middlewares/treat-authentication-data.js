import { randomUUID } from "node:crypto";
import { checkRoomValidity } from "../../functions/check-room-validity.js";
import { checkUsernameValidity } from "../../functions/check-username-validity.js";
import { io, rooms, sessions } from "../server.js";
export async function treatAuthenticationData(socket, next) {
    const { sessionId, username, room } = getAuthenticationData(socket);
    if (await sessionIdNotUnique(sessionId))
        return next(new Error("sessionId already used"));
    if (noLoginDataProvided(username, room)) {
        return sessionFound(sessions, sessionId) ? next() : next(new Error("no session found"));
    }
    else {
        if (loginDataInvalid(username, room))
            return next(new Error("invalid login informations"));
        if (noMoreRoomSlot(rooms, room))
            return next(new Error("no more room slot"));
        if (roomIsFull(rooms, room))
            return next(new Error("room is full"));
        if (roomIsClosed(rooms, room))
            return next(new Error("room is closed"));
        const newSessionId = randomUUID();
        socket.handshake.auth.sessionId = newSessionId; //this line is not semantically correct as handshakes are supposed to represent the data the client provided to get connected. I think I should use socket.data
        sessions.add(newSessionId, username, room);
        return next();
    }
}
function noMoreRoomSlot(rooms, roomName) {
    const room = rooms.get(roomName);
    const isRoomCreation = room === undefined;
    if (isRoomCreation) {
        const currentRoomSlotUsed = Object.keys(rooms.storage).length;
        return currentRoomSlotUsed >= rooms.roomLimit;
    }
    else {
        return false;
    }
}
async function sessionIdNotUnique(sessionId) {
    const sockets = await io.fetchSockets();
    return sockets.some((connectedSocket) => connectedSocket.handshake.auth.sessionId === sessionId);
}
function roomIsFull(rooms, roomName) {
    const room = rooms.get(roomName);
    if (room) {
        const currentPlayerNumber = Object.keys(room.players).length;
        return currentPlayerNumber >= room.playersLimit;
    }
    else {
        return false;
    }
}
function roomIsClosed(rooms, roomName) {
    const room = rooms.get(roomName);
    return room ? !room.roomOpened : false;
}
function noLoginDataProvided(username, room) {
    return username === undefined && room === undefined;
}
function loginDataInvalid(username, room) {
    return !checkUsernameValidity(username) || !checkRoomValidity(room);
}
function sessionFound(sessions, sessionId) {
    return sessions.get(sessionId);
}
function getAuthenticationData(socket) {
    const autoConnection = process.env.AUTO_CONNECTION;
    const environment = process.env.NODE_ENV;
    if (environment === "development" && autoConnection) {
        return { sessionId: "", username: "DevUsername", room: "DevRoom" };
    }
    else {
        const { sessionId, username, room } = socket.handshake.auth;
        return { sessionId, username, room };
    }
}
