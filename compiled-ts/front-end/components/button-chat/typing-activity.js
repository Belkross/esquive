import { socket } from "../../config/initialize-socket-io.js";
const ACTIVITY_DURATION = 1500;
export const typingActivity = {
    setTimer(ref) {
        ref.current = setTimeout(() => {
            socket.emit("updateTypingActivity", false);
            ref.current = null;
        }, ACTIVITY_DURATION);
    },
    start(ref) {
        socket.emit("updateTypingActivity", true);
        this.setTimer(ref);
    },
    reset(ref) {
        clearTimeout(ref.current);
        this.setTimer(ref);
    },
};
