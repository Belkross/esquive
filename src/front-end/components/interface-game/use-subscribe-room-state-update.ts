import { useEffect } from "react"
import { AppState, setState } from "../../../types/main.js"
import { socket } from "../../config/initialize-socket-io.js"

export function useSubscribeRoomStateUpdate(setAppState: setState<AppState>) {
  useEffect(() => {
    socket.on("roomStateUpdate", (roomState) => {
      setAppState((prevAppState) => ({ ...prevAppState, roomState }))
    })
  }, [setAppState])
}
