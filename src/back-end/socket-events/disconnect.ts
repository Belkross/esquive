import { doNothing } from "../../functions/do-nothing.js"
import { ServerManager } from "../../types/type-server"

export function disconnect(server: ServerManager) {
  server.socket.on("disconnect", () => {
    doNothing()
  })
}
