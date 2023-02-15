import { doNothing } from "../../functions/do-nothing.js"
import { ServerManager } from "../../types/server"

export function disconnect(server: ServerManager) {
  server.socket.on("disconnect", () => {
    doNothing()
  })
}
