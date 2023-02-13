import { useState, Dispatch, SetStateAction } from "react"
import { Alert, createAlert } from "./create-alert.js"

export type SnackBarState = {
  display: boolean
  setDisplay: Dispatch<SetStateAction<boolean>>
  alertQueue: Alert[]
  setAlertQueue: Dispatch<SetStateAction<Alert[]>>
  currentAlert: Alert
  setCurrentAlert: Dispatch<SetStateAction<Alert>>
}

export function useSnackbarState(): SnackBarState {
  const [display, setDisplay] = useState(false)
  const [alertQueue, setAlertQueue] = useState<Alert[]>([])
  const [currentAlert, setCurrentAlert] = useState(createAlert("defaultEmpty"))

  return {
    display,
    setDisplay,
    alertQueue,
    setAlertQueue,
    currentAlert,
    setCurrentAlert,
  }
}
