import express from "express"
import { randomUUID } from "node:crypto"
import { createServer } from "node:http"
import { checkRoomValidity } from "../functions/check-room-validity.js"
import { checkUsernameValidity } from "../functions/check-username-validity.js"
import { RoomStorage, SessionStorage } from "../types/server.js"
import { createIo } from "./config/create-io.js"
import { MapStorage } from "../functions/map-storage.js"
import { connection } from "./socket-events/connection.js"
import { disconnect } from "./socket-events/disconnect.js"
import { leaveRoom } from "./socket-events/leave-room.js"

const port = process.env.PORT || 1000
const app = express()
const httpServer = createServer(app)
const io = createIo(httpServer)
const sessions: SessionStorage = new MapStorage()
const rooms: RoomStorage = new MapStorage()

app.get("/", (request, response) => response.send("Server is active"))

io.use((socket, next) => {
  const { browserId, username, room } = socket.handshake.auth
  const noLoginInformation = username === undefined && room === undefined

  if (noLoginInformation) {
    const sessionExist = sessions.get(browserId)
    return browserId && sessionExist ? next() : next(new Error("no session found"))
  } else {
    if (!checkUsernameValidity(username) || !checkRoomValidity(room)) {
      return next(new Error("invalid login informations"))
    }
    //TODO: vérifier que la room n’est pas pleine
    const newBrowserId = randomUUID()
    socket.handshake.auth.browserId = newBrowserId
    sessions.save(newBrowserId, { username, room })
    return next()
  }
})

io.on("connection", (socket) => {
  const server = { socket, io, sessions, rooms }

  connection(server)
  leaveRoom(server)
  disconnect(server)
})

httpServer.listen(port, () => {
  console.log(`server connected to port : ${port}`)
})
