import { randomUUID } from "node:crypto"
import { Socket } from "socket.io"
import { ExtendedError } from "socket.io/dist/namespace.js"
import { DefaultEventsMap } from "socket.io/dist/typed-events.js"
import { checkRoomValidity } from "../../functions/check-room-validity.js"
import { checkUsernameValidity } from "../../functions/check-username-validity.js"
import { ClientToServerEvents, ServerToClientEvents } from "../../types/server.js"
import { modelConnections } from "../config/database/models.js"
import { RoomStorage } from "../config/room-storage.js"
import { SessionStorage } from "../config/session-storage.js"
import { io, rooms, sessions } from "../server.js"

type Next = (err?: ExtendedError | undefined) => void
type SocketArg = Socket<ClientToServerEvents, ServerToClientEvents, DefaultEventsMap>

export async function treatAuthenticationData(socket: SocketArg, next: Next) {
  const { sessionId, username, room } = getAuthenticationData(socket)
  console.log(`Middleware: username ${username}, room ${room}, sessionId ${sessionId}`)

  //Vérifie la nouveauté du sessionId parmi toutes les socket connectées
  if (await sessionIdNotUnique(sessionId)) {
    console.log("Middleware: sessionId already used", sessionId)
    return next(new Error("sessionId already used"))
  }

  if (noLoginDataProvided(username, room)) {
    console.log(
      `Middleware: no username and room provided. Trying to find an existing session of sessionId ${sessionId}`
    )
    if (sessionFound(sessions, sessionId)) {
      console.log(`Middleware: found an existing session for ${sessionId}`)
      return next()
    } else {
      console.log(`Middleware: no existing session for ${sessionId}`)
      return next(new Error("no session found"))
    }
  } else {
    if (loginDataInvalid(username, room)) return next(new Error("invalid login informations"))
    if (noMoreRoomSlot(rooms, room)) return next(new Error("no more room slot"))
    if (roomIsFull(rooms, room)) return next(new Error("room is full"))
    if (roomIsClosed(rooms, room)) return next(new Error("room is closed"))

    console.log(`Middleware: Username and room provided: ${username}, ${room}. Going to connection.`)

    const newSessionId = randomUUID()
    socket.handshake.auth.sessionId = newSessionId //this line is not semantically correct as handshakes are supposed to represent the data the client provided to get connected. I think I should use socket.data
    sessions.add(newSessionId, username, room)
    await registerConnection(socket)
    return next()
  }
}

async function registerConnection(socket: SocketArg) {
  if (process.env.NODE_ENV !== "production") return

  await modelConnections.create({
    totalRoom: Object.keys(rooms.storage).length,
    totalUser: Object.keys(sessions.storage).length - 1,
    handshake: socket.handshake,
  })
}

function noMoreRoomSlot(rooms: RoomStorage, roomName: string) {
  const room = rooms.get(roomName)
  const isRoomCreation = room === undefined
  if (isRoomCreation) {
    const currentRoomSlotUsed = Object.keys(rooms.storage).length
    return currentRoomSlotUsed >= rooms.roomLimit
  } else {
    return false
  }
}

async function sessionIdNotUnique(sessionId: string) {
  const sockets = await io.fetchSockets()
  return sockets.some((connectedSocket) => connectedSocket.handshake.auth.sessionId === sessionId)
}

function roomIsFull(rooms: RoomStorage, roomName: string) {
  const room = rooms.get(roomName)

  if (room) {
    const currentPlayerNumber = Object.keys(room.players).length
    return currentPlayerNumber >= room.playersLimit
  } else {
    return false
  }
}

function roomIsClosed(rooms: RoomStorage, roomName: string) {
  const room = rooms.get(roomName)
  return room ? !room.roomOpened : false
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

function getAuthenticationData(socket: SocketArg) {
  const autoConnection = process.env.AUTO_CONNECTION
  const environment = process.env.NODE_ENV

  if (environment === "development" && autoConnection) {
    return { sessionId: "", username: "DevUsername", room: "DevRoom" }
  } else {
    const { sessionId, username, room } = socket.handshake.auth
    return { sessionId, username, room }
  }
}
