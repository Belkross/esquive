import { ServerManager } from "../../types/type-server.js"

export default function joinRoom(server: ServerManager) {
  server.socket.on("joinRoom", (room, username) => {

    console.log(`${server.socket.id}: ${username} joined room ${room}`)
  })
}
