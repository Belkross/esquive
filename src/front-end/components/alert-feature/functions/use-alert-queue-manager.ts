import { useEffect } from "react"
import { SnackBarState } from "./use-snackbar-state.js"

export default function useAlertQueueManager(snackbar: SnackBarState) {
  useEffect(() => {
    if (checkIfNeedToDisplayAnAlert(snackbar)) setUpNewAlert(snackbar)
    else if (checkIfInterruptCurrentAlertWithAnother(snackbar)) snackbar.setDisplay(false)
    //Then the close transition will reset the message alert to "" with handleExited.
    //a rerender occure, and it reach the conditions for checkIfNeedToDisplayAnAlert
  }, [snackbar])
}

function checkIfNeedToDisplayAnAlert(snackbar: SnackBarState) {
  return snackbar.alertQueue.length > 0 && snackbar.currentAlert.message === ""
}

function checkIfInterruptCurrentAlertWithAnother(snackbar: SnackBarState) {
  const anAlertCurrentlyDisplayed = snackbar.display && snackbar.currentAlert.message
  const anAlertWaits = snackbar.alertQueue.length > 0

  return anAlertCurrentlyDisplayed && anAlertWaits
}

function setUpNewAlert(snackbar: SnackBarState) {
  const nextAlertInQueue = snackbar.alertQueue[0]

  snackbar.setDisplay(true)
  snackbar.setCurrentAlert(nextAlertInQueue)
  snackbar.setAlertQueue((previousQueueState) => previousQueueState.slice(1))
}
