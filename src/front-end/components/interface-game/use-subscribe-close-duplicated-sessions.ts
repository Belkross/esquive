import { useEffect } from "react"
import { AppState, FlowlessFunction, setState } from "../../../types/main.js"
import { socket } from "../../config/initialize-socket-io.js"

export function useSubscribeCloseDuplicatedSessions(appState: AppState, setAppState: setState<AppState>) {
  useEffect((): FlowlessFunction => {
    socket.on("closeDuplicatedSessions", (sessionId) => {
      if (appState.sessionId === sessionId) {
        socket.disconnect()
        setAppState((prevAppState) => ({ ...prevAppState, status: "logging", room: "" }))
      }
    })

    return () => socket.off("closeDuplicatedSessions")
  }, [setAppState, appState.sessionId])
}
