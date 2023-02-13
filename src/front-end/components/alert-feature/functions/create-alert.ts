import { AlertSeverity, alerts, AlertId } from "./alerts"

export interface Alert {
  readonly key: number
  readonly severity: AlertSeverity
  readonly message: string
}

export function createAlert(alertId: AlertId): Alert {
  return {
    ...alerts[alertId],
    key: Date.now(),
  }
}
