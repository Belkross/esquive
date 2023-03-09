import { useEffect } from "react";
import { RoomState } from "../../back-end/config/room-state/room-state.js";
import { socket } from "../config/initialize-socket-io.js";
export function useSubscribeIntentionalDisconnection(setAppState) {
    useEffect(() => {
        socket.on("disconnect", (reason) => {
            const intentionalDisconnection = reason === "io client disconnect" || reason === "io server disconnect";
            if (intentionalDisconnection)
                setAppState((prevAppState) => ({
                    ...prevAppState,
                    status: "logging",
                    room: "",
                    roomState: new RoomState("", ""),
                }));
        });
        return () => socket.off("disconnect");
    }, [setAppState]);
}
