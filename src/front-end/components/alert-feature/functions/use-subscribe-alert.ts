import { useEffect, useRef } from "react"
import { FlowlessFunction } from "../../../../types/types.js"
import { socket } from "../../../config/initialize-socket-io.js"
import { createAlert } from "./create-alert.js"
import { SnackBarState } from "./use-snackbar-state.js"

export function useSubscribeAlert(snackbar: SnackBarState) {
  const setAlertQueueRef = useRef(snackbar.setAlertQueue)

  useEffect((): FlowlessFunction => {
    socket.on("alert", (alertId) =>
      setAlertQueueRef.current((prevAlertQueue) => [...prevAlertQueue, createAlert(alertId)])
    )

    return () => socket.off("alert")
  }, [])
}
