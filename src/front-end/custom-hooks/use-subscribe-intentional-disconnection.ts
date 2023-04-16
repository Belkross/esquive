import { useEffect } from "react"
import { RoomState } from "../../back-end/config/room-state/room-state.js"
import { setState, AppState, FlowlessFunction } from "../../types/types.js"
import { socket } from "../config/initialize-socket-io.js"

export function useSubscribeIntentionalDisconnection(setAppState: setState<AppState>): void {
  useEffect((): FlowlessFunction => {
    socket.on("disconnect", (reason) => {
      const intentionalDisconnection = reason === "io client disconnect" || reason === "io server disconnect"
      if (intentionalDisconnection)
        setAppState((prevAppState) => ({
          ...prevAppState,
          status: "logging",
          room: "",
          roomState: new RoomState("", ""),
        }))
    })

    return () => socket.off("disconnect")
  }, [setAppState])
}
