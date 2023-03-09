import { SoundBox } from "./sound-box.js";
const sounds = new SoundBox();
export function listenToEventRequiringASound(prevRoomState, roomState) {
    playSoundOnTimerStart(prevRoomState, roomState);
    playSoundOnTrapActivate(prevRoomState, roomState);
    playSoundOnRoundFail(prevRoomState, roomState);
    playSoundOnRoundSucceed(prevRoomState, roomState);
    playSoundOnGuessSubmit(prevRoomState, roomState);
    playSoundOnChatMessage(prevRoomState, roomState);
}
function playSoundOnChatMessage(prevRoomState, roomState) {
    const newGeneralMessage = prevRoomState.generalMessages.at(-1)?.date !== roomState.generalMessages.at(-1)?.date;
    const newOratorMessage = prevRoomState.oratorMessages.at(-1)?.date !== roomState.oratorMessages.at(-1)?.date;
    if (newGeneralMessage || newOratorMessage)
        sounds.play("chat-message");
}
function playSoundOnTimerStart(prevRoomState, roomState) {
    const timerStart = prevRoomState.timerIsRunning === false && roomState.timerIsRunning === true;
    if (timerStart)
        sounds.play("timer-start");
}
function playSoundOnTrapActivate(prevRoomState, roomState) {
    const trapActivate = prevRoomState.isJudgingTrap === false && roomState.isJudgingTrap === true;
    if (trapActivate)
        sounds.play("activate-trap");
}
function playSoundOnRoundSucceed(prevRoomState, roomState) {
    const roundSucceed = (prevRoomState.teams.one.hasSucceededGuess === undefined && roomState.teams.one.hasSucceededGuess === true) ||
        (prevRoomState.teams.two.hasSucceededGuess === undefined && roomState.teams.two.hasSucceededGuess === true);
    if (roundSucceed)
        sounds.play("success");
}
function playSoundOnRoundFail(prevRoomState, roomState) {
    const roundFail = (prevRoomState.teams.one.hasSucceededGuess === undefined && roomState.teams.one.hasSucceededGuess === false) ||
        (prevRoomState.teams.two.hasSucceededGuess === undefined && roomState.teams.two.hasSucceededGuess === false);
    if (roundFail)
        sounds.play("failure");
}
function playSoundOnGuessSubmit(prevRoomState, roomState) {
    const guessSubmit = prevRoomState.teams.one.guessAttempts.length < roomState.teams.one.guessAttempts.length ||
        prevRoomState.teams.two.guessAttempts.length < roomState.teams.two.guessAttempts.length;
    if (guessSubmit)
        sounds.play("submit-guess");
}
