import { useEffect } from "react"
import { AppState, FlowlessFunction, setState } from "../../../types/main.js"
import { socket } from "../../config/initialize-socket-io.js"

export function useSubscribeCloseDuplicatedSessions(appState: AppState, setAppState: setState<AppState>) {
  useEffect((): FlowlessFunction => {
    socket.on("closeDuplicatedSessions", (browserId) => {
      if (appState.browserId === browserId) {
        socket.disconnect()
        setAppState((prevAppState) => ({ ...prevAppState, status: "logging", room: "" }))
      }
    })

    return () => socket.off("closeDuplicatedSessions")
  }, [setAppState, appState.browserId])
}
