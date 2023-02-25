import { randomUUID } from "node:crypto"
import { Socket } from "socket.io"
import { ExtendedError } from "socket.io/dist/namespace.js"
import { DefaultEventsMap } from "socket.io/dist/typed-events.js"
import { checkRoomValidity } from "../../functions/check-room-validity.js"
import { checkUsernameValidity } from "../../functions/check-username-validity.js"
import { ClientToServerEvents, ServerToClientEvents } from "../../types/server.js"
import { SessionStorage } from "../config/session-storage.js"
import { io, sessions } from "../server.js"

type Next = (err?: ExtendedError | undefined) => void
type SocketArg = Socket<ClientToServerEvents, ServerToClientEvents, DefaultEventsMap>

export async function treatAuthenticationData(socket: SocketArg, next: Next) {
  const { sessionId, username, room } = socket.handshake.auth

  if (await sessionIdNotUnique(sessionId)) return next(new Error("sessionId already used"))

  if (noLoginDataProvided(username, room)) {
    return sessionFound(sessions, sessionId) ? next() : next(new Error("no session found"))
  } else {
    if (loginDataInvalid(username, room)) return next(new Error("invalid login informations"))
    //TODO: ensureRoomIsNotFull
    const newSessionId = randomUUID()
    socket.handshake.auth.sessionId = newSessionId //this line is not semantically correct as handshakes are supposed to represent the data the client provided to get connected. I think I should use socket.data
    sessions.add(newSessionId, username, room)
    return next()
  }
}

async function sessionIdNotUnique(sessionId: string) {
  const sockets = await io.fetchSockets()
  return sockets.some((connectedSocket) => connectedSocket.handshake.auth.sessionId === sessionId)
}

function noLoginDataProvided(username: string, room: string) {
  return username === undefined && room === undefined
}

function loginDataInvalid(username: string, room: string) {
  return !checkUsernameValidity(username) || !checkRoomValidity(room)
}

function sessionFound(sessions: SessionStorage, sessionId: string) {
  return sessions.get(sessionId)
}

//to skip the login when developing
/* const sessionId = ""
  const username = "DevBelkross"
  const room = "" // "DevRoom" */
