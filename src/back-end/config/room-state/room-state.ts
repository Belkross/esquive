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
import { shuffleTeams } from "./methods/shuffle-teams.js"
import { startTimer } from "./methods/start-timer.js"
import { submitGuess } from "./methods/submit-guess.js"
import { submitSecretWordOpinion } from "./methods/submit-secret-word-opinion.js"
import { submitTrapOpinion } from "./methods/submit-trap-opinion.js"
import { submitTrap } from "./methods/submit-trap.js"
import { switchStartingTeam } from "./methods/switch-starting-team.js"
import { trapSlotsUsed } from "./methods/trap-slots-used.js"
import { PlayerData } from "./player-data.js"
import { TeamData } from "./team-data.js"
import { changeRoundSettings } from "./methods/change-round-settings.js"
import { addChatMessage, ChatMessage } from "./methods/add-chat-message.js"

export class RoomState {
  static readonly TIMER_LIMIT = 360 //seconds
  static readonly TRAP_SLOT_LIMIT = 8
  static readonly WIN_CONDITION_LIMIT = 20
  static readonly GUESS_ATTEMPT_LIMIT = 10
  static readonly CHAT_MESSAGE_MAX_LENGTH = 150
  static readonly WORD_SUBMITION_MIN_LENGTH = 1
  static readonly WORD_SUBMITION_MAX_LENGTH = 30
  static readonly ROOMNAME_MIN_LENGTH = 3
  static readonly ROOMNAME_MAX_LENGTH = 12
  static readonly USERNAME_MIN_LENGTH = 3
  static readonly USERNAME_MAX_LENGTH = 12

  private readonly isProductionEnvironment = process.env.NODE_ENV === "production"

  readonly roomName: string
  readonly players: { [sessionId: string]: PlayerData } = {}
  readonly teams: Record<Team, TeamData>
  readonly historic: string[] = []
  readonly highestRoundAdvancement = 6
  readonly historicLengthLimit = 400
  readonly chatMessagesLengthLimit = 600
  readonly secretWordChangeLimit = 3
  readonly playersLimit = 10
  readonly generalMessages: ChatMessage[] = []
  readonly oratorMessages: ChatMessage[] = []

  roundPhase: RoundPhase = "pre round"
  roundAdvancement = 1
  winCondition = 2
  trappingDuration = this.isProductionEnvironment ? 180 : 34
  guessingDuration = this.isProductionEnvironment ? 120 : 10
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

  activateTrap = activateTrap
  addChatMessage = addChatMessage
  addPlayer = addPlayer
  addToHistoric = addToHistoric
  applyRoundOutcome = applyRoundOutcome
  announceEventualGuessFailure = announceEventualGuessgFailure
  announceMatchWinner = announceMatchWinner
  announceNextPhase = announceNextPhase
  announceTimerStart = announceTimerStart
  cancelTrap = cancelTrap
  changeRole = changeRole
  changeRoundSettings = changeRoundSettings
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
  shuffleTeams = shuffleTeams
  startTimer = startTimer
  submitGuess = submitGuess
  submitSecretWordOpinion = submitSecretWordOpinion
  submitTrap = submitTrap
  submitTrapOpinion = submitTrapOpinion
  switchStartingTeam = switchStartingTeam
  trapSlotsUsed = trapSlotsUsed
}
