export type AlertId =
  | "criticalError"
  | "guessAlreadySubmitted"
  | "invalidLoginInformations"
  | "invalidRoom"
  | "invalidUsername"
  | "null"
  | "serverDown"
  | "sessionNotFound"
  | "trapAlreadySubmitted"
  | "trapLimitExceeded"

export type AlertSeverity = "info" | "success" | "warning" | "error"
export type AlertData = {
  readonly severity: AlertSeverity
  readonly message: string
}

export const alerts: Record<AlertId, AlertData> = {
  null: {
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
  sessionNotFound: {
    severity: "warning",
    message: "Vous avez été déconnecté du salon. Veuillez rafraîchir la page.",
  },
  trapLimitExceeded: {
    severity: "info",
    message: "Votre équipe a atteint le nombre maximum de piège.",
  },
  guessAlreadySubmitted: {
    severity: "info",
    message: "Le mot a déjà été proposé.",
  },
  trapAlreadySubmitted: {
    severity: "info",
    message: "Le piège a déjà été proposé",
  },
}
