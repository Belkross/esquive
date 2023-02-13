import { ServerManager } from "../../types/type-server"

export function disconnect(server: ServerManager) {
  server.socket.on("disconnect", (reason) => {
    console.log(`${server.socket.id}: disconnect (${reason})`)
  })
}
