import { SxProps, Typography } from "@mui/material"
import { RoomState } from "../../back-end/config/room-state.js"
import { AppState } from "../../types/main.js"

type Props = {
  appState: AppState
}

export function Instructions({ appState }: Props) {
  const instruction = pickInstruction(appState.roomState, appState.browserId)

  return <Typography sx={style_typography}>{instruction}</Typography>
}

const style_typography: SxProps = {
  marginTop: 2,
}

function pickInstruction(roomState: RoomState, browserId: string) {
  const roundPhase = roomState.roundPhase
  const team = roomState.players[browserId].team
  const role = roomState.players[browserId].role

  /* eslint-disable sonarjs/no-duplicate-string */
  const teamOneSecretWord = roomState.teams.one.secretWord
  const teamTwoSecretWord = roomState.teams.two.secretWord
  const instructions = {
    "pre round": {
      one: {
        guesser: "La manche va commencer, préparez-vous à chercher des pièges.",
        orator: "La manche va commencer, préparez-vous à chercher des pièges.",
      },
      two: {
        guesser: "La manche va commencer, préparez-vous à chercher des pièges.",
        orator: "La manche va commencer, préparez-vous à chercher des pièges.",
      },
    },
    trapping: {
      one: {
        guesser: `Vous devez piéger le mot ${teamOneSecretWord.toUpperCase()} ! Trouvez les mots qui ont le plus de chance d’être utilisés par l’orateur adverse.`,
        orator: `Vous devez piéger le mot ${teamOneSecretWord.toUpperCase()} ! Trouvez les mots qui ont le plus de chance d’être utilisés par l’orateur adverse.`,
      },
      two: {
        guesser: `Vous devez piéger le mot ${teamTwoSecretWord.toUpperCase()} ! Trouvez les mots qui ont le plus de chance d’être utilisés par l’orateur adverse.`,
        orator: `Vous devez piéger le mot ${teamTwoSecretWord.toUpperCase()} ! Trouvez les mots qui ont le plus de chance d’être utilisés par l’orateur adverse.`,
      },
    },
    "pre guessing one": {
      one: {
        guesser: "Préparez-vous à deviner le mot que va vous décrire votre orateur.",
        orator:
          "Préparez-vous à faire deviner un mot à votre auditoire. Attention ! Il faudra éviter les mots piégés par l’équipe adverse.",
      },
      two: {
        guesser: "L’orateur adverse va tenter de faire deviner à son auditoire le mot que vous avez piégé.",
        orator: "L’orateur adverse va tenter de faire deviner à son auditoire le mot que vous avez piégé.",
      },
    },
    "guessing one": {
      one: {
        guesser: "Essayez de deviner le mot décrit par votre orateur !",
        orator: `Vous devez faire deviner à votre auditoire le mot ${teamTwoSecretWord.toUpperCase()} !`,
      },
      two: {
        guesser:
          "Écoutez la performance de l’orateur adverse et arrêtez le si il prononce un des mots que vous avez piégé !",
        orator:
          "Écoutez la performance de l’orateur adverse et arrêtez le si il prononce un des mots que vous avez piégé !",
      },
    },
    "pre guessing two": {
      one: {
        guesser: "L’orateur adverse va tenter de faire deviner à son auditoire le mot que vous avez piégé.",
        orator: "L’orateur adverse va tenter de faire deviner à son auditoire le mot que vous avez piégé.",
      },
      two: {
        guesser: "Préparez-vous à deviner le mot que va vous décrire votre orateur.",
        orator:
          "Préparez-vous à faire deviner un mot à votre auditoire. Attention ! Il faudra éviter les mots piégés par l’équipe adverse.",
      },
    },
    "guessing two": {
      one: {
        guesser:
          "Écoutez la performance de l’orateur adverse et arrêtez le si il prononce un des mots que vous avez piégé !",
        orator:
          "Écoutez la performance de l’orateur adverse et arrêtez le si il prononce un des mots que vous avez piégé !",
      },
      two: {
        guesser: "Essayez de deviner le mot décrit par votre orateur !",
        orator: `Vous devez faire deviner à votre auditoire le mot ${teamOneSecretWord.toUpperCase()} !`,
      },
    },
  }

  return instructions[roundPhase][team][role]
}
