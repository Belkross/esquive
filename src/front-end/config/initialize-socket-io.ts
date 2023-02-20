import { io } from "socket.io-client"
import { SocketClient } from "../../types/server"
import localStorageKeys from "./local-storage-keys.js"

export let socket: SocketClient

export function initializeSocketIo() {
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
    auth: { browserId: sessionStorage.getItem(localStorageKeys.browserId) },
  })

  socket.onAny((eventName, ...args) => {
    console.log(eventName, args)
  })
}
