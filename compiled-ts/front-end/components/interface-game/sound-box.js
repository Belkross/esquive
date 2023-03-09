import timerStart from "../../../assets/tracks/timer-start.wav";
import submitGuess from "../../../assets/tracks/submit-guess.wav";
import success from "../../../assets/tracks/success.wav";
import failure from "../../../assets/tracks/failure.wav";
import activateTrap from "../../../assets/tracks/activate-trap.wav";
import chatMessage from "../../../assets/tracks/chat-message.mp3";
export class SoundBox {
    sounds = {
        success: new Audio(success),
        failure: new Audio(failure),
        "timer-start": new Audio(timerStart),
        "submit-guess": new Audio(submitGuess),
        "activate-trap": new Audio(activateTrap),
        "chat-message": new Audio(chatMessage),
    };
    constructor() {
        for (const sound in this.sounds) {
            this.sounds[sound].volume = 0.3;
        }
    }
    play(trackName) {
        this.sounds[trackName].load();
        this.sounds[trackName].play();
    }
}
