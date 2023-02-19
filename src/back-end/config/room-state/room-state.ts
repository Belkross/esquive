import { Team, RoundPhase } from "../../../types/room-state.js"
import { addPlayer } from "./methods/add-player.js"
import { addToHistoric } from "./methods/add-to-historic.js"
import { announceEventualGuessgFailure } from "./methods/announce-eventual-guess-failure.js"
import { announceMatchWinner } from "./methods/announce-match-winner.js"
import { announceNextPhase } from "./methods/announce-next-phase.js"
import { announceTimerStart } from "./methods/announce-timer-start.js"
import { applyRoundOutcome } from "./methods/apply-round-outcome.js"
import { changeRole } from "./methods/change-role.js"
import { checkIfEndOfMatch } from "./methods/check-if-end-of-match.js"
import { configureNextRoundPhase } from "./methods/configure-next-round-phase.js"
import { deletePlayer } from "./methods/delete-player.js"
import { drawSecretWord } from "./methods/draw-secret-word.js"
import { getActivePlayerNumber } from "./methods/get-active-player-number.js"
import { getOpponentTeam } from "./methods/get-opponent-team.js"
import { initializeSecretWordsDeck } from "./methods/initialize-secret-word-deck.js"
import { makeSureTeamsHaveOrator } from "./methods/make-sure-teams-have-orator.js"
import { progressToNextRoundPhase } from "./methods/progress-to-next-round-phase.js"
import { resetAllTrapOpinions } from "./methods/reset-all-trap-opinions.js"
import { resetGuessAttemptsRemaining } from "./methods/reset-guess-attempts-remaining.js"
import { resetGuessAttempts } from "./methods/reset-guess-attempts.js"
import { resetScores } from "./methods/reset-scores.js"
import { resetSecretWordOpinions } from "./methods/reset-secret-word-opinions.js"
import { resetSecretWordChangeRemaining } from "./methods/reset-secret-word-remaining.js"
import { resetTeamOutcomes } from "./methods/reset-team-outcomes.js"
import { resetTraps } from "./methods/reset-traps.js"
import { setTimer } from "./methods/set-timer.js"
import { startTimer } from "./methods/start-timer.js"
import { switchStartingTeam } from "./methods/switch-starting-team.js"

import { PlayerData } from "./player-data.js"
import { TeamData } from "./team-data.js"

export class RoomState {
  private readonly isProductionEnvironment = process.env.NODE_ENV === "production"
  private readonly guessAttemptLimit = 10
  private readonly winConditionLimit = 20
  private readonly playersLimit = 10
  private readonly timerLimit = 360 //seconds
  private readonly trapSlotLimit = 12
  
  readonly roomName: string
  readonly players: { [browserId: string]: PlayerData } = {}
  readonly teams: Record<Team, TeamData>
  readonly historic: string[] = []
  readonly highestRoundAdvancement = 6
  readonly historicLengthLimit = 50
  readonly secretWordChangeLimit = 3
  
  roundPhase: RoundPhase = "pre round"
  roundAdvancement = 1
  winCondition = 2
  trappingDuration = this.isProductionEnvironment ? 180 : 10
  guessingDuration = this.isProductionEnvironment ? 120 : 8
  guessAttemptsProvided = this.isProductionEnvironment ? 5 : 2
  trapSlotsProvided = this.isProductionEnvironment ? 4 : 8
  startingTeam: Team = "two"
  isJudgingTrap = false
  secretWordsDeck: string[]
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
  addToHistoric = addToHistoric
  applyRoundOutcome = applyRoundOutcome
  announceEventualGuessFailure = announceEventualGuessgFailure
  announceMatchWinner = announceMatchWinner
  announceNextPhase = announceNextPhase
  announceTimerStart = announceTimerStart
  changeRole = changeRole
  checkIfEndOfMatch = checkIfEndOfMatch
  configureNextRoundPhase = configureNextRoundPhase
  deletePlayer = deletePlayer
  drawSecretWord = drawSecretWord
  getActivePlayerNumber = getActivePlayerNumber
  getOpponentTeam = getOpponentTeam
  initializeSecretWordsDeck = initializeSecretWordsDeck
  makeSureTeamsHaveOrator = makeSureTeamsHaveOrator
  progressToNextRoundPhase = progressToNextRoundPhase
  resetAllTrapOpinions = resetAllTrapOpinions
  resetGuessAttempts = resetGuessAttempts
  resetGuessAttemptsRemaining = resetGuessAttemptsRemaining
  resetScores = resetScores
  resetSecretWordChangeRemaining = resetSecretWordChangeRemaining
  resetSecretWordOpinions = resetSecretWordOpinions
  resetTeamOutcomes = resetTeamOutcomes
  resetTraps = resetTraps
  setTimer = setTimer
  startTimer = startTimer
  switchStartingTeam = switchStartingTeam
}
