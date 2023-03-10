import { useEffect } from "react";
import { socket } from "../../config/initialize-socket-io.js";
import { useAlertFeature } from "../alert-feature/alert-feature.js";
import { FAKE_LOADING_DURATION } from "./interface-connecting-server.js";
export function useSubscribeConnectError(setAppState) {
    const displayNewAlert = useAlertFeature();
    useEffect(() => {
        socket.on("connect_error", (error) => {
            if (error.message === "xhr poll error")
                socket.disconnect();
            setTimeout(() => {
                setAppState((prevAppState) => ({ ...prevAppState, status: "logging" }));
                const clientFeedback = chooseClientFeedback(error.message);
                if (clientFeedback)
                    displayNewAlert(clientFeedback);
            }, FAKE_LOADING_DURATION);
        });
        return () => socket.off("connect_error");
    }, [setAppState, displayNewAlert]);
}
function chooseClientFeedback(errorMessage) {
    switch (errorMessage) {
        case "no session found":
            return null;
        case "xhr poll error":
            return "serverDown";
        case "invalid login informations":
            return "invalidLoginInformations";
        case "sessionId already used":
            return "sessionIdAlreadyUsed";
        case "room is closed":
            return "roomIsClosed";
        case "room is full":
            return "roomIsFull";
        case "no more room slot":
            return "noMoreRoomSlot";
        default:
            return "criticalError";
    }
}