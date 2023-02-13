import { createContext, ReactElement, SyntheticEvent, useContext } from "react"
import { IconButton, Snackbar, SnackbarCloseReason } from "@mui/material"
import { AlertId, AlertSeverity } from "./functions/alerts.js"
import { useSubscribeAlert } from "./functions/use-subscribe-alert.js"
import { doNothing } from "../../../functions/do-nothing.js"
import { createAlert } from "./functions/create-alert.js"
import { useAlertQueueManager } from "./functions/use-alert-queue-manager.js"
import { useSnackbarState } from "./functions/use-snackbar-state.js"
import { Close } from "@mui/icons-material"

const ALERT_DISPLAY_DURATION = 6000

const AlertFeatureContext = createContext((alertId: AlertId) => doNothing(alertId))
export const useAlertFeature = () => useContext(AlertFeatureContext)

type Props = {
  children: ReactElement
}

export function AlertFeature({ children }: Props) {
  const snackbar = useSnackbarState()

  const handleClose = (event: SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
    if (reason === "clickaway") return
    snackbar.setDisplay(false)
  }
  const handleExited = () => snackbar.setCurrentAlert(createAlert("defaultEmpty"))

  const displayNewAlert = (alertId: AlertId) => {
    if (alertId) snackbar.setAlertQueue((prevAlertQueue) => [...prevAlertQueue, createAlert(alertId)])
  }

  useAlertQueueManager(snackbar)
  useSubscribeAlert(snackbar)

  return (
    <AlertFeatureContext.Provider value={displayNewAlert}>
      <Snackbar
        key={snackbar.currentAlert.key}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={snackbar.display} //when this props switch from true to false, it trigger a transition
        message={snackbar.currentAlert.message}
        autoHideDuration={ALERT_DISPLAY_DURATION}
        onClose={handleClose}
        TransitionProps={{ onExited: handleExited }} //when the transition end
        ContentProps={{ sx: style_snackbar(snackbar.currentAlert.severity) }}
        action={
          <IconButton size="small" onClick={handleClose} sx={style_buttonClose(snackbar.currentAlert.severity)}>
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
