import { Dispatch, SetStateAction, useEffect, useRef } from "react"
import { FAKE_LOADING_DURATION } from "../../../config/app-constants.js"
import { AppState, FlowlessFunction } from "../../../types/types.js"
import { socket } from "../../config/initialize-socket-io.js"
import { useAlertFeature } from "../alert-feature/alert-feature.js"
import { AlertId } from "../alert-feature/functions/alerts.js"

export  function useSubscribeConnectError(setAppState: Dispatch<SetStateAction<AppState>>) {
  const displayNewAlertRef = useRef(useAlertFeature())
  const setAppStateRef = useRef(setAppState)

  useEffect((): FlowlessFunction => {
    socket.on("connect_error", (error) => {
      console.log(error.message)
      if (error.message === "xhr poll error") socket.disconnect()

      setTimeout(() => {
        setAppStateRef.current((prevAppState) => ({ ...prevAppState, status: "logging" }))

        const clientFeedback = chooseClientFeedback(error.message)
        if (clientFeedback) displayNewAlertRef.current(clientFeedback)
      }, FAKE_LOADING_DURATION)
    })

    return () => socket.off("connect_error")
  }, [])
}

function chooseClientFeedback(errorMessage: string): AlertId | null {
  switch (errorMessage) {
    case "no session found":
      return null

    case "xhr poll error":
      return "serverDown"

    case "invalid login informations":
      return "invalidLoginInformations"

    default:
      return "criticalError"
  }
}
