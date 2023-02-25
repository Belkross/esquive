import { useEffect } from "react"
import { AppState, FlowlessFunction, setState } from "../../../types/main.js"
import { socket } from "../../config/initialize-socket-io.js"
import { listenToEventRequiringASound } from "./listen-to-event-requiring-a-sound.js"

export function useSubscribeRoomStateUpdate(setAppState: setState<AppState>) {
  useEffect((): FlowlessFunction => {
    socket.on("roomStateUpdate", (roomState) => {
      setAppState((prevAppState) => {
        listenToEventRequiringASound(prevAppState.roomState, roomState)

        return { ...prevAppState, roomState }
      })
    })

    return () => socket.off("roomStateUpdate")
  }, [setAppState])
}
