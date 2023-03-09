export const alerts = {
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
    wrongMomentForKick: {
        severity: "warning",
        message: "Attendez la fin de la manche pour expulser un joueur.",
    },
    sessionIdAlreadyUsed: {
        severity: "warning",
        message: "Tentative de connexion d’une session dupliquée refusée.",
    },
    roomIsClosed: {
        severity: "info",
        message: "Le salon que vous tentez de rejoindre est fermé."
    },
    roomIsFull: {
        severity: "info",
        message: "Le salon que vous tentez de rejoindre est plein.",
    },
    noMoreRoomSlot: {
        severity: "info",
        message: "Tous les emplacement de salon sont occupés. Veuillez réessayer plus tard.",
    },
};
