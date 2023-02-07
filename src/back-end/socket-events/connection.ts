import { ServerManager } from "../../types/type-server.js"

export default function connection(server: ServerManager) {
  console.log(`${server.socket.id}: connection.`)
  server.socket.emit("connectedToSocketIo")
}
