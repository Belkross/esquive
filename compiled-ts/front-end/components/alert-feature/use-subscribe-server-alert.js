import { useEffect } from "react";
import { socket } from "../../config/initialize-socket-io.js";
import { createAlert } from "./create-alert.js";
export function useSubscribeServerAlert(setAlertQueue) {
    useEffect(() => {
        socket.on("alert", (alertId) => setAlertQueue((prevAlertQueue) => [...prevAlertQueue, createAlert(alertId)]));
        return () => socket.off("alert");
    }, [setAlertQueue]);
}
