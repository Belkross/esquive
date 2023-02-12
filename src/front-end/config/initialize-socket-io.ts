import { io, Socket } from "socket.io-client"
import { ServerToClientEvents, ClientToServerEvents } from "../../types/type-server"
import localStorageKeys from "./local-storage-keys.js"

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

  socket = io(serverUrl, {
    auth: { sessionId: localStorage.getItem(localStorageKeys.sessionId), username: "", room: "" },
    //TODO: it would be more logic to set username and room to undefined, but I need to fix their validity checker first
  })

  socket.onAny((eventName, ...args) => {
    console.log("onAny", eventName, args)
  })
}
