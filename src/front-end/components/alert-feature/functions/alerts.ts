export type AlertId =
  | "defaultEmpty"
  | "invalidUsername"
  | "invalidRoom"
  | "invalidLoginInformations"
  | "serverDown"
  | "criticalError"

export type AlertSeverity = "info" | "success" | "warning" | "error"
export type AlertData = {
  readonly severity: AlertSeverity
  readonly message: string
}

export const alerts: Record<AlertId, AlertData> = {
  defaultEmpty: {
    severity: "info",
    message: "",
  },
  invalidUsername: {
    severity: "warning",
    message: "Pseudo invalide.",
  },
  invalidRoom: {
    severity: "warning",
    message: "Nom de salon invalide",
  },
  invalidLoginInformations: {
    severity: "warning",
    message: "Les informations de connexion sont invalides.",
  },
  serverDown: {
    severity: "warning",
    message: "Serveur indisponible. Veuillez réessayer plus tard.",
  },
  criticalError: {
    severity: "error",
    message: "Erreur critique. Merci de signaler le problème en expliquant le contexte.",
  },
}
