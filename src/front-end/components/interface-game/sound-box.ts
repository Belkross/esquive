import timerStart from "./timer-start.wav"
import submitGuess from "./submit-guess.wav"
import success from "./success.wav"
import failure from "./failure.wav"
import activateTrap from "./activate-trap.wav"
import chatMessage from "./chat-message.mp3"

type Track = "timer-start" | "submit-guess" | "success" | "failure" | "activate-trap" | "chat-message"

export class SoundBox {
  private readonly sounds: Record<Track, HTMLAudioElement> = {
    success: new Audio(success),
    failure: new Audio(failure),
    "timer-start": new Audio(timerStart),
    "submit-guess": new Audio(submitGuess),
    "activate-trap": new Audio(activateTrap),
    "chat-message": new Audio(chatMessage),
  }

  constructor() {
    for (const sound in this.sounds) {
      this.sounds[sound as Track].volume = 0.5
    }
  }

  play(trackName: Track) {
    this.sounds[trackName].load()
    this.sounds[trackName].play()
  }
}
