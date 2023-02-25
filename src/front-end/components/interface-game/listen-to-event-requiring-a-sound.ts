import { RoomState } from "../../../back-end/config/room-state/room-state.js"
import { SoundBox } from "../../tracks/sound-box.js"

const sounds = new SoundBox()

export function listenToEventRequiringASound(prevRoomState: RoomState, roomState: RoomState) {
  playSoundOnTimerStart(prevRoomState, roomState)
  playSoundOnTrapActivate(prevRoomState, roomState)
  playSoundOnRoundFail(prevRoomState, roomState)
  playSoundOnRoundSucceed(prevRoomState, roomState)
  playSoundOnGuessSubmit(prevRoomState, roomState)
}

function playSoundOnTimerStart(prevRoomState: RoomState, roomState: RoomState) {
  const timerStart = prevRoomState.timerIsRunning === false && roomState.timerIsRunning === true
  if (timerStart) sounds.play("timer-start")
}

function playSoundOnTrapActivate(prevRoomState: RoomState, roomState: RoomState) {
  const trapActivate = prevRoomState.isJudgingTrap === false && roomState.isJudgingTrap === true
  if (trapActivate) sounds.play("activate-trap")
}

function playSoundOnRoundSucceed(prevRoomState: RoomState, roomState: RoomState) {
  const roundSucceed =
    (prevRoomState.teams.one.hasSucceededGuess === undefined && roomState.teams.one.hasSucceededGuess === true) ||
    (prevRoomState.teams.two.hasSucceededGuess === undefined && roomState.teams.two.hasSucceededGuess === true)
  if (roundSucceed) sounds.play("success")
}

function playSoundOnRoundFail(prevRoomState: RoomState, roomState: RoomState) {
  const roundFail =
    (prevRoomState.teams.one.hasSucceededGuess === undefined && roomState.teams.one.hasSucceededGuess === false) ||
    (prevRoomState.teams.two.hasSucceededGuess === undefined && roomState.teams.two.hasSucceededGuess === false)
  if (roundFail) sounds.play("failure")
}

function playSoundOnGuessSubmit(prevRoomState: RoomState, roomState: RoomState) {
  const guessSubmit =
    prevRoomState.teams.one.guessAttempts.length < roomState.teams.one.guessAttempts.length ||
    prevRoomState.teams.two.guessAttempts.length < roomState.teams.two.guessAttempts.length
  if (guessSubmit) sounds.play("submit-guess")
}
