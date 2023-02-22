import { IconButton, Snackbar, SnackbarCloseReason } from "@mui/material"
import { AlertId, AlertSeverity } from "./alerts.js"
import { doNothing } from "../../../functions/do-nothing.js"
import { createAlert, Alert } from "./create-alert.js"
import { Close } from "@mui/icons-material"
import { closeAlert } from "./close-alert.js"
import { useSubscribeServerAlert } from "./use-subscribe-server-alert.js"
import {
  createContext,
  ReactElement,
  SyntheticEvent,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"

const ALERT_DISPLAY_DURATION = 6000

const AlertFeatureContext = createContext((alertId: AlertId) => doNothing(alertId))
export const useAlertFeature = () => useContext(AlertFeatureContext)

type Props = {
  children: ReactElement
}

export function AlertFeature({ children }: Props) {
  const [display, setDisplay] = useState(false)
  const [alertQueue, setAlertQueue] = useState<Alert[]>([])
  const [currentAlert, setCurrentAlert] = useState(createAlert("null"))
  const memoizedSetAlertQueue = useMemo(() => setAlertQueue, [])

  const handleClose = (event: SyntheticEvent | Event, reason?: SnackbarCloseReason) => closeAlert(setDisplay, reason)
  const handleExited = () => setCurrentAlert(createAlert("null"))

  const displayNewAlert = useCallback((alertId: AlertId) => {
    setAlertQueue((prevAlertQueue) => [...prevAlertQueue, createAlert(alertId)])
  }, [])

  useSubscribeServerAlert(memoizedSetAlertQueue)
  useEffect(() => {
    //I don’t want to extract this Effect because it has too much mutable dependencies
    const needToDisplayAlert = alertQueue.length > 0 && currentAlert.message === ""
    const anAlertCurrentlyDisplayed = display && currentAlert.message
    const anAlertWaits = alertQueue.length > 0

    if (needToDisplayAlert) {
      setDisplay(true)
      setCurrentAlert(alertQueue[0])
      setAlertQueue((prevQueue) => prevQueue.slice(1))
    } else if (anAlertCurrentlyDisplayed && anAlertWaits) {
      setDisplay(false)
    }
  }, [display, alertQueue, currentAlert.message])

  return (
    <AlertFeatureContext.Provider value={displayNewAlert}>
      <Snackbar
        key={currentAlert.key}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={display} //when this props switch from true to false, it trigger a transition
        message={currentAlert.message}
        autoHideDuration={ALERT_DISPLAY_DURATION}
        onClose={handleClose}
        TransitionProps={{ onExited: handleExited }} //when the transition end
        ContentProps={{ sx: style_snackbar(currentAlert.severity) }}
        action={
          <IconButton size="small" onClick={handleClose} sx={style_buttonClose(currentAlert.severity)}>
            <Close />
          </IconButton>
        }
      />
      {children}
    </AlertFeatureContext.Provider>
  )
}

const style_snackbar = (severity: AlertSeverity) => ({
  backgroundColor: `${severity}.main`,
  flexFlow: "row nowrap",
  justifyContent: "start",
  alignItems: "start",
})

const style_buttonClose = (severity: AlertSeverity) => ({
  color: "inherit",
  backgroundColor: `${severity}.dark`,
  borderColor: `${severity}.dark`,
})
