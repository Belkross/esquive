import { useEffect } from "react"
import { AppState, FlowlessFunction } from "../../../types/main.js"
import { socket } from "../../config/initialize-socket-io.js"

export function useSubscribeCloseDuplicatedSessions(appState: AppState) {
  useEffect((): FlowlessFunction => {
    socket.on("closeDuplicatedSessions", (sessionId) => {
      if (appState.sessionId === sessionId) socket.disconnect()
    })

    return () => socket.off("closeDuplicatedSessions")
  }, [appState.sessionId])
}
