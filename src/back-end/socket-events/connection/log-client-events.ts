import { ServerManager } from "../../../types/server.js"

export function logClientEvents(server: ServerManager, username: string) {
  server.socket.onAny((eventName, ...args) => {
    console.log(`${username}: ${eventName}`, args)
  })
}
