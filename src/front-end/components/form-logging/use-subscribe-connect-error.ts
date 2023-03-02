import { Dispatch, SetStateAction, useEffect } from "react"
import { AppState, FlowlessFunction } from "../../../types/main.js"
import { socket } from "../../config/initialize-socket-io.js"
import { useAlertFeature } from "../alert-feature/alert-feature.js"
import { AlertId } from "../alert-feature/alerts.js"
import { FAKE_LOADING_DURATION } from "../interface-connecting/interface-connecting-server.js"

export function useSubscribeConnectError(setAppState: Dispatch<SetStateAction<AppState>>) {
  const displayNewAlert = useAlertFeature()

  useEffect((): FlowlessFunction => {
    socket.on("connect_error", (error) => {
      if (error.message === "xhr poll error") socket.disconnect()

      setTimeout(() => {
        setAppState((prevAppState) => ({ ...prevAppState, status: "logging" }))

        const clientFeedback = chooseClientFeedback(error.message)
        if (clientFeedback) displayNewAlert(clientFeedback)
      }, FAKE_LOADING_DURATION)
    })

    return () => socket.off("connect_error")
  }, [setAppState, displayNewAlert])
}

function chooseClientFeedback(errorMessage: string): AlertId | null {
  switch (errorMessage) {
    case "no session found":
      return null

    case "xhr poll error":
      return "serverDown"

    case "invalid login informations":
      return "invalidLoginInformations"

    case "sessionId already used":
      return "sessionIdAlreadyUsed"

    case "room is full":
      return "roomIsFull"

    case "no more room slot":
      return "noMoreRoomSlot"

    default:
      return "criticalError"
  }
}
