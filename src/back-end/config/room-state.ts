import { shuffleArray } from "../../functions/shuffle-array.js"

export type Team = "one" | "two"
type Role = "guesser" | "orator"
type RoundPhase = "pre round" | "trapping" | "pre guessing one" | "guessing one" | "pre guessing two" | "guessing two"
type Trap = { value: string; author: string }

class PlayerData {
  readonly browserId: string
  readonly trapOpinions: { [trapIndex: number]: boolean | undefined } = {}
  username: string
  team: Team = "one"
  role: Role = "guesser"
  connected = true
  isAdmin = false
  isTyping = false
  secretWordOpinion: boolean | undefined = undefined

  constructor(browserId: string, username: string) {
    this.browserId = browserId
    this.username = username
  }
}

class TeamData {
  readonly color: "indigo" | "rouge"
  readonly opponent: Team
  readonly traps: Trap[] = []
  readonly guesses: string[] = []
  score = 0
  secretWord = ""
  secretWordChangeRemaining = 0
  guessAttemptRemaining = 0
  hasSucceededGuess: boolean | undefined = undefined

  constructor(team: Team) {
    this.color = team === "one" ? "indigo" : "rouge"
    this.opponent = team === "one" ? "two" : "one"
  }
}

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

  initializeSecretWordsDeck(wordsList: string) {
    const array = wordsList.split("\n")
    return shuffleArray(array)
  }

  addPlayer(browserId: string, username: string) {
    const playerData = new PlayerData(browserId, username)

    const isCreatorOfTheRoom = Object.keys(this.players).length === 0
    if (isCreatorOfTheRoom) playerData.isAdmin = true

    this.players[browserId] = playerData
  }

  deletePlayer(browserId: string) {
    delete this.players[browserId]
  }

  getActivePlayerNumber() {
    const players = Object.values(this.players)
    return players.filter((player) => player.connected === true).length
  }
}
