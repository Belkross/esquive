import express from "express"
import { randomUUID } from "node:crypto"
import { createServer } from "node:http"
import { checkRoomValidity } from "../functions/check-room-validity.js"
import { checkUsernameValidity } from "../functions/check-username-validity.js"
import { createIo } from "./config/create-io.js"
import { connection } from "./socket-events/connection/connection.js"
import { disconnect } from "./socket-events/disconnect.js"
import { RoomStorage } from "./config/room-storage.js"
import { SessionStorage } from "./config/session-storage.js"
import { changeRole } from "./socket-events/change-role.js"
import { nextRoundPhase } from "./socket-events/next-round-phase.js"
import { ServerManager } from "../types/server.js"
import { submitTrap } from "./socket-events/submit-trap.js"
import { submitGuess } from "./socket-events/submit-guess.js"

const port = process.env.PORT || 1000
const app = express()
const httpServer = createServer(app)
const io = createIo(httpServer)
const sessions = new SessionStorage()
const rooms = new RoomStorage()

app.get("/", (request, response) => response.send("Server is active"))

io.use((socket, next) => {
  //const { sessionId, username, room } = socket.handshake.auth
  //to skip the login when developing
  const sessionId = ""
  const username = "DevBelkross"
  const room = "DevRoom"

  const noLoginInformation = username === undefined && room === undefined

  if (noLoginInformation) {
    const sessionExist = sessions.get(sessionId)
    return sessionId && sessionExist ? next() : next(new Error("no session found"))
  } else {
    if (!checkUsernameValidity(username) || !checkRoomValidity(room)) {
      return next(new Error("invalid login informations"))
    }
    //TODO: vérifier que la room n’est pas pleine
    const newSessionId = randomUUID()
    socket.handshake.auth.sessionId = newSessionId
    sessions.add(newSessionId, username, room)
    return next()
  }
})

io.on("connection", (socket) => {
  const server: ServerManager = { socket, io, sessions, rooms, sessionId: socket.handshake.auth.sessionId }

  connection(server)
  changeRole(server)
  nextRoundPhase(server)
  submitTrap(server)
  submitGuess(server)
  disconnect(server)
})

httpServer.listen(port, () => {
  console.log(`server connected to port : ${port}`)
})
