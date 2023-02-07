import { io, Socket } from "socket.io-client"
import { ClientToServerEvents, ServerToClientEvents } from "../../types/type-socket-io.js"

export let socket: Socket<ServerToClientEvents, ClientToServerEvents>

export default function initializeSocketIo() {
  const environment = process.env.NODE_ENV

  let serverUrl
  switch (environment) {
    case "production":
      serverUrl = ""
      break
    case "development":
      serverUrl = "http://localhost:1000"
      break
    default:
      serverUrl = ""
      console.error("Unknown environment value detected.")
  }

  socket = io(serverUrl)
}
