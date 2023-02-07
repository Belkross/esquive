import express from "express"
import { createServer } from "node:http"
import { ServerManager } from "../types/type-server.js"
import createIo from "./config/create-io.js"
import connection from "./socket-events/connection.js"
import disconnect from "./socket-events/disconnect.js"
import joinRoom from "./socket-events/join-room.js"

const port = process.env.PORT || 1000

const app = express()
const httpServer = createServer(app)
const io = createIo(httpServer)

app.get("/", (request, response) => {
  response.send("Server is active")
})

io.on("connection", (socket) => {
  const server: ServerManager = { socket, io }
  connection(server)
  joinRoom(server)
  disconnect(server)
})

httpServer.listen(port, () => {
  console.log(`server connected to port : ${port}`)
})
