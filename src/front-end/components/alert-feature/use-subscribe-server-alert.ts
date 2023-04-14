import { Dispatch, SetStateAction, useEffect } from "react"
import { FlowlessFunction } from "../../../types/types.js"
import { socket } from "../../config/initialize-socket-io.js"
import { Alert, createAlert } from "./create-alert.js"

export function useSubscribeServerAlert(setAlertQueue: Dispatch<SetStateAction<Alert[]>>) {
  useEffect((): FlowlessFunction => {
    socket.on("alert", (alertId) => setAlertQueue((prevAlertQueue) => [...prevAlertQueue, createAlert(alertId)]))

    return () => socket.off("alert")
  }, [setAlertQueue])
}
