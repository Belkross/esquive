import { Team, RoundPhase } from "../../../types/room-state.js"
import { activateTrap } from "./methods/activate-trap.js"
import { addPlayer } from "./methods/add-player.js"
import { addToHistoric } from "./methods/add-to-historic.js"
import { announceEventualGuessgFailure } from "./methods/announce-eventual-guess-failure.js"
import { announceMatchWinner } from "./methods/announce-match-winner.js"
import { announceNextPhase } from "./methods/announce-next-phase.js"
import { announceTimerStart } from "./methods/announce-timer-start.js"
import { applyRoundOutcome } from "./methods/apply-round-outcome.js"
import { cancelTrap } from "./methods/cancel-trap.js"
import { changeRole } from "./methods/change-role.js"
import { changeSecretWord } from "./methods/change-secret-word.js"
import { checkIfEndOfMatch } from "./methods/check-if-end-of-match.js"
import { checkTrapExistence } from "./methods/check-trap-existence.js"
import { configureNextRoundPhase } from "./methods/configure-next-round-phase.js"
import { deletePlayer } from "./methods/delete-player.js"
import { drawSecretWord } from "./methods/draw-secret-word.js"
import { getActivePlayerNumber } from "./methods/get-active-player-number.js"
import { getOpponentTeam } from "./methods/get-opponent-team.js"
import { getPlayingTeam } from "./methods/get-playing-team.js"
import { initializeSecretWordsDeck } from "./methods/initialize-secret-word-deck.js"
import { judgeTrap } from "./methods/judge-trap.js"
import { makeSureTeamsHaveOrator } from "./methods/make-sure-teams-have-orator.js"
import { progressToNextRoundPhase } from "./methods/progress-to-next-round-phase.js"
import { reportForbiddenClue } from "./methods/report-forbidden-clue.js"
import { resetGuessAttemptsRemaining } from "./methods/reset-guess-attempts-remaining.js"
import { resetGuessAttempts } from "./methods/reset-guess-attempts.js"
import { resetScores } from "./methods/reset-scores.js"
import { resetSecretWordChangeRemaining } from "./methods/reset-secret-word-remaining.js"
import { resetTeamOutcomes } from "./methods/reset-team-outcomes.js"
import { resetTraps } from "./methods/reset-traps.js"
import { setTimer } from "./methods/set-timer.js"
import { startTimer } from "./methods/start-timer.js"
import { stopTimer } from "./methods/stop-timer.js"
import { submitGuess } from "./methods/submit-guess.js"
import { submitSecretWordOpinion } from "./methods/submit-secret-word-opinion.js"
import { submitTrapOpinion } from "./methods/submit-trap-opinion.js"
import { submitTrap } from "./methods/submit-trap.js"
import { switchStartingTeam } from "./methods/switch-starting-team.js"
import { trapSlotsUsed } from "./methods/trap-slots-used.js"
import { PlayerData } from "./player-data.js"
import { TeamData } from "./team-data.js"

export class RoomState {
  private readonly isProductionEnvironment = process.env.NODE_ENV === "production"
  private readonly guessAttemptLimit = 10
  private readonly winConditionLimit = 20
  private readonly playersLimit = 10
  private readonly timerLimit = 360 //seconds

  readonly roomName: string
  readonly players: { [sessionId: string]: PlayerData } = {}
  readonly teams: Record<Team, TeamData>
  readonly historic: string[] = []
  readonly highestRoundAdvancement = 6
  readonly historicLengthLimit = 50
  readonly secretWordChangeLimit = 3
  readonly trapSlotLimit = 12

  roundPhase: RoundPhase = "pre round"
  roundAdvancement = 1
  winCondition = 2
  trappingDuration = this.isProductionEnvironment ? 180 : 10
  guessingDuration = this.isProductionEnvironment ? 120 : 8
  guessAttemptsProvided = this.isProductionEnvironment ? 5 : 8
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

  activateTrap = activateTrap
  addPlayer = addPlayer
  addToHistoric = addToHistoric
  applyRoundOutcome = applyRoundOutcome
  announceEventualGuessFailure = announceEventualGuessgFailure
  announceMatchWinner = announceMatchWinner
  announceNextPhase = announceNextPhase
  announceTimerStart = announceTimerStart
  cancelTrap = cancelTrap
  changeRole = changeRole
  changeSecretWord = changeSecretWord
  checkIfEndOfMatch = checkIfEndOfMatch
  checkTrapExistence = checkTrapExistence
  configureNextRoundPhase = configureNextRoundPhase
  deletePlayer = deletePlayer
  drawSecretWord = drawSecretWord
  getActivePlayerNumber = getActivePlayerNumber
  getOpponentTeam = getOpponentTeam
  getPlayingTeam = getPlayingTeam
  initializeSecretWordsDeck = initializeSecretWordsDeck
  judgeTrap = judgeTrap
  makeSureTeamsHaveOrator = makeSureTeamsHaveOrator
  progressToNextRoundPhase = progressToNextRoundPhase
  reportForbiddenClue = reportForbiddenClue
  resetGuessAttempts = resetGuessAttempts
  resetGuessAttemptsRemaining = resetGuessAttemptsRemaining
  resetScores = resetScores
  resetSecretWordChangeRemaining = resetSecretWordChangeRemaining
  resetTeamOutcomes = resetTeamOutcomes
  resetTraps = resetTraps
  setTimer = setTimer
  startTimer = startTimer
  stopTimer = stopTimer
  submitGuess = submitGuess
  submitSecretWordOpinion = submitSecretWordOpinion
  submitTrap = submitTrap
  submitTrapOpinion = submitTrapOpinion
  switchStartingTeam = switchStartingTeam
  trapSlotsUsed = trapSlotsUsed
}
