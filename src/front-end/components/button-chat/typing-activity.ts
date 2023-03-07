import { MutableRefObject } from "react"
import { socket } from "../../config/initialize-socket-io.js"

type Ref = MutableRefObject<NodeJS.Timeout | null>
const ACTIVITY_DURATION = 1500

export const typingActivity = {
  setTimer(ref: Ref) {
    ref.current = setTimeout(() => {
      socket.emit("updateTypingActivity", false)
      ref.current = null
    }, ACTIVITY_DURATION)
  },
  start(ref: Ref) {
    socket.emit("updateTypingActivity", true)
    this.setTimer(ref)
  },
  reset(ref: Ref) {
    clearTimeout(ref.current as NodeJS.Timeout)
    this.setTimer(ref)
  },
}
