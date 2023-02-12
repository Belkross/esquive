import express from "express"
import { randomUUID } from "node:crypto"
import { createServer } from "node:http"
import checkRoomValidity from "../functions/check-room-validity.js"
import checkUsernameValidity from "../functions/check-username-validity.js"
import createIo from "./config/create-io.js"
import SessionStorage from "./config/session-storage.js"
import disconnect from "./socket-events/disconnect.js"

const port = process.env.PORT || 1000
const app = express()
const httpServer = createServer(app)
const io = createIo(httpServer)
const sessions = new SessionStorage()

app.get("/", (request, response) => response.send("Server is active"))

io.use((socket, next) => {
  const { sessionId, username, room } = socket.handshake.auth
  const noLoginInformation = username === "" && room === ""

  if (noLoginInformation) {
    const sessionExist = sessions.findSession(sessionId)
    return sessionId && sessionExist ? next() : next(new Error("no session found"))
  } else {
    if (!checkUsernameValidity(username) || !checkRoomValidity(room)) {
      return next(new Error("invalid login informations"))
    }
    //TODO: vérifier que la room n’est pas pleine
    const newSessionId = randomUUID()
    socket.handshake.auth.sessionId = newSessionId
    sessions.saveSession(newSessionId, { username, room })
    return next()
  }
})

io.on("connection", (socket) => {
  const server = { socket, io }
  const session = sessions.findSession(socket.handshake.auth.sessionId)
  if (session) {
    socket.emit("clientJoinedRoom", {
      sessionId: socket.handshake.auth.sessionId,
      username: session.username,
      room: session.room,
      roomState: "roomState",
    })
    socket.join(session.room)
    //TODO: partager à tout le monde l’arrivée d’un nouveau joueur
  }

  disconnect(server)
})

httpServer.listen(port, () => {
  console.log(`server connected to port : ${port}`)
})
