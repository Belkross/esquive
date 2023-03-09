import { alerts } from "./alerts";
export function createAlert(alertId) {
    return {
        key: Date.now(),
        severity: alerts[alertId].severity,
        message: alerts[alertId].message,
    };
}
