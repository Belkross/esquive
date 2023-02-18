import { useEffect } from "react"
import { AppState, FlowlessFunction, setState } from "../../../types/main.js"
import { socket } from "../../config/initialize-socket-io.js"

export function useSubscribeRoomStateUpdate(setAppState: setState<AppState>) {
  useEffect((): FlowlessFunction => {
    socket.on("roomStateUpdate", (roomState) => {
      setAppState((prevAppState) => ({ ...prevAppState, roomState }))
    })

    return () => socket.off("roomStateUpdate")
  }, [setAppState])
}
