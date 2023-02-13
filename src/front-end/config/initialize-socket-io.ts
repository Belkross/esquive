import { io, Socket } from "socket.io-client"
import { ServerToClientEvents, ClientToServerEvents } from "../../types/type-server"
import localStorageKeys from "./local-storage-keys.js"

export let socket: Socket<ServerToClientEvents, ClientToServerEvents>

export  function initializeSocketIo() {
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

  socket = io(serverUrl, {
    auth: { sessionId: localStorage.getItem(localStorageKeys.sessionId) },
  })

  socket.onAny((eventName, ...args) => {
    console.log(eventName, args)
  })
  
}
