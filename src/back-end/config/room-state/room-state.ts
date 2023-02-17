import { Team, RoundPhase } from "../../../types/room-state.js"
import { addPlayer } from "./methods/add-player.js"
import { deletePlayer } from "./methods/delete-player.js"
import { getActivePlayerNumber } from "./methods/get-active-player-number.js"
import { initializeSecretWordsDeck } from "./methods/initialize-secret-word-deck.js"
import { PlayerData } from "./player-data.js"
import { TeamData } from "./team-data.js"

export class RoomState {
  private readonly isProductionEnvironment = process.env.NODE_ENV === "production"
  private readonly secretWordsDeck: string[]
  private readonly highestRoundAdvancement = 6
  private readonly guessAttemptLimit = 10
  private readonly winConditionLimit = 20
  private readonly playersLimit = 10
  private readonly timerLimit = 360 //seconds
  private readonly trapSlotLimit = 12
  private readonly secretWordChangeLimit = 3
  private readonly historicLengthLimit = 50

  readonly roomName: string
  readonly players: { [browserId: string]: PlayerData } = {}
  readonly teams: Record<Team, TeamData>
  readonly historic: string[] = []

  roundPhase: RoundPhase = "pre round"
  roundAvancement = 1
  winCondition = 2
  trappingDuration = this.isProductionEnvironment ? 180 : 10
  guessingDuration = this.isProductionEnvironment ? 120 : 8
  guessAttemptsProvided = this.isProductionEnvironment ? 5 : 2
  trapSlotsProvided = this.isProductionEnvironment ? 4 : 8
  startingTeam: Team = "one"
  isJudgingTrap = false
  secretWordsDeckDrawIndex = 0
  timer: number
  timerIsRunning = false

  constructor(roomName: string, secretWordList: string) {
    this.roomName = roomName
    this.teams = { one: new TeamData("one"), two: new TeamData("two") }
    this.historic.push(`Bienvenue dans le salon ${this.roomName}.`, "La phase de piège va commencer.")
    this.secretWordsDeck = this.initializeSecretWordsDeck(secretWordList)
    this.timer = this.trappingDuration
  }

  addPlayer = addPlayer
  deletePlayer = deletePlayer
  getActivePlayerNumber = getActivePlayerNumber
  initializeSecretWordsDeck = initializeSecretWordsDeck
}
