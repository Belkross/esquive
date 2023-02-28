import express from "express"
import { createServer } from "node:http"
import { createIo } from "./config/create-io.js"
import { connection } from "./socket-events/connection.js"
import { disconnect } from "./socket-events/disconnect.js"
import { RoomStorage } from "./config/room-storage.js"
import { SessionStorage } from "./config/session-storage.js"
import { changeRole } from "./socket-events/change-role.js"
import { nextRoundPhase } from "./socket-events/next-round-phase.js"
import { ServerManager } from "../types/server.js"
import { submitTrap } from "./socket-events/submit-trap.js"
import { submitGuess } from "./socket-events/submit-guess.js"
import { cancelTrap } from "./socket-events/cancel-trap.js"
import { submitTrapOpinion } from "./socket-events/submit-trap-opinion.js"
import { submitSecretWordOpinion } from "./socket-events/submit-secret-word-opinion.js"
import { changeSecretWord } from "./socket-events/change-secret-word.js"
import { reportForbiddenClue } from "./socket-events/report-forbidden-clue.js"
import { judgeTrap } from "./socket-events/judge-trap.js"
import { activateTrap } from "./socket-events/activate-trap.js"
import { shuffleTeams } from "./socket-events/shuffle-teams.js"
import { promoteAdmin } from "./socket-events/promote-admin.js"
import { kickPlayer } from "./socket-events/kick-player.js"
import { treatAuthenticationData } from "./middlewares/treat-authentication-data.js"
import { changeRoundSettings } from "./socket-events/change-round-settings.js"
import { submitChatMessage } from "./socket-events/submit-chat-message.js"

const port = process.env.PORT || 1000
const app = express()
const httpServer = createServer(app)
export const io = createIo(httpServer)
export const sessions = new SessionStorage()
export const rooms = new RoomStorage()

app.get("/", (request, response) => response.send("Server is active"))

io.use(treatAuthenticationData)

io.on("connection", (socket) => {
  const server: ServerManager = { socket, io, sessions, rooms, sessionId: socket.handshake.auth.sessionId }
  connection(server)

  activateTrap(server)
  cancelTrap(server)
  changeRole(server)
  changeRoundSettings(server)
  changeSecretWord(server)
  disconnect(server)
  judgeTrap(server)
  kickPlayer(server)
  nextRoundPhase(server)
  promoteAdmin(server)
  reportForbiddenClue(server)
  shuffleTeams(server)
  submitChatMessage(server)
  submitGuess(server)
  submitSecretWordOpinion(server)
  submitTrap(server)
  submitTrapOpinion(server)
})

httpServer.listen(port, () => {
  console.log(`server connected to port : ${port}`)
})

