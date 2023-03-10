import { io } from "socket.io-client"
import { SocketClient } from "../../types/server"
import storageKeys from "./storage-keys.js"

export let socket: SocketClient

export function initializeSocketIo() {
  const environment = process.env.NODE_ENV

  let serverUrl
  switch (environment) {
    case "production":
      console.log("server url:", process.env.SERVER_URL)
      serverUrl = process.env.SERVER_URL as string
      break
    case "development":
      serverUrl = "http://localhost:1000"
      break
    default:
      serverUrl = ""
      console.error("Unknown environment value detected.")
  }

  socket = io(serverUrl, {
    auth: { sessionId: sessionStorage.getItem(storageKeys.sessionId) },
  })

  if (environment === "development") logSocketEvents()
}

function logSocketEvents() {
  socket.onAny((eventName, ...args) => {
    console.log(eventName, args)
  })
}
