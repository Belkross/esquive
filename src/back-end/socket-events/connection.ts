import secretWordList from "../../assets/secret-word-list.js"
import { ServerManager } from "../../types/server.js"
import { RoomState } from "../config/room-state/room-state.js"

export function connection(server: ServerManager) {
  const { io, socket, sessions, rooms, sessionId } = server
  const { username, roomName } = sessions.get(sessionId)
  const roomDoesNotExistYet = rooms.get(roomName) === undefined
  logClientEvents(server, username)

  let roomState

  if (roomDoesNotExistYet) {
    roomState = rooms.add(roomName, secretWordList)
    roomState.addPlayer(sessionId, username)
  } else {
    roomState = rooms.get(roomName)
    updateJoiningPlayerData(roomState, sessionId, username)
    io.to(roomName).emit("roomStateUpdate", roomState)
  }

  socket.join(roomName)
  socket.emit("joinRoom", sessionId, roomState)
}

function updateJoiningPlayerData(roomState: RoomState, sessionId: string, username: string) {
  const isNewPlayer = roomState.players[sessionId] === undefined

  if (isNewPlayer) roomState.addPlayer(sessionId, username)
  else roomState.players[sessionId].connected = true
}

function logClientEvents(server: ServerManager, username: string) {
  server.socket.onAny((eventName, ...args) => {
    console.log(`${username}: ${eventName}`, args)
  })
}
