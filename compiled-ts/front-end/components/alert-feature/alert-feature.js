import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { IconButton, Snackbar } from "@mui/material";
import { doNothing } from "../../../functions/do-nothing.js";
import { createAlert } from "./create-alert.js";
import { Close } from "@mui/icons-material";
import { closeAlert } from "./close-alert.js";
import { useSubscribeServerAlert } from "./use-subscribe-server-alert.js";
import { createContext, useCallback, useContext, useEffect, useMemo, useState, } from "react";
const ALERT_DISPLAY_DURATION = 6000;
const AlertFeatureContext = createContext((alertId) => doNothing(alertId));
export const useAlertFeature = () => useContext(AlertFeatureContext);
export function AlertFeature({ children }) {
    const [display, setDisplay] = useState(false);
    const [alertQueue, setAlertQueue] = useState([]);
    const [currentAlert, setCurrentAlert] = useState(createAlert("null"));
    const memoizedSetAlertQueue = useMemo(() => setAlertQueue, []);
    const handleClose = (event, reason) => closeAlert(setDisplay, reason);
    const handleExited = () => setCurrentAlert(createAlert("null"));
    const displayNewAlert = useCallback((alertId) => {
        setAlertQueue((prevAlertQueue) => [...prevAlertQueue, createAlert(alertId)]);
    }, []);
    useSubscribeServerAlert(memoizedSetAlertQueue);
    useEffect(() => {
        //I don’t want to extract this Effect because it has too much mutable dependencies
        const needToDisplayAlert = alertQueue.length > 0 && currentAlert.message === "";
        const anAlertCurrentlyDisplayed = display && currentAlert.message;
        const anAlertWaits = alertQueue.length > 0;
        if (needToDisplayAlert) {
            setDisplay(true);
            setCurrentAlert(alertQueue[0]);
            setAlertQueue((prevQueue) => prevQueue.slice(1));
        }
        else if (anAlertCurrentlyDisplayed && anAlertWaits) {
            setDisplay(false);
        }
    }, [display, alertQueue, currentAlert.message]);
    return (_jsxs(AlertFeatureContext.Provider, { value: displayNewAlert, children: [_jsx(Snackbar, { anchorOrigin: { vertical: "top", horizontal: "center" }, open: display, message: currentAlert.message, autoHideDuration: ALERT_DISPLAY_DURATION, onClose: handleClose, TransitionProps: { onExited: handleExited }, ContentProps: { sx: style_snackbar(currentAlert.severity) }, action: _jsx(IconButton, { size: "small", onClick: handleClose, sx: style_buttonClose(currentAlert.severity), children: _jsx(Close, {}) }) }, currentAlert.key), children] }));
}
const style_snackbar = (severity) => ({
    backgroundColor: `${severity}.main`,
    flexFlow: "row nowrap",
    justifyContent: "start",
    alignItems: "start",
});
const style_buttonClose = (severity) => ({
    color: "inherit",
    backgroundColor: `${severity}.dark`,
    borderColor: `${severity}.dark`,
});
