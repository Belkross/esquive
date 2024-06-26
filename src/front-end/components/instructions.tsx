import { Box, SxProps, Typography } from "@mui/material"
import { getPlayingTeam } from "../../back-end/config/room-state/methods/get-playing-team.js"
import { RoomState } from "../../back-end/config/room-state/room-state.js"
import { AppState } from "../../types/types.js"
import { getPlayerTeam } from "../../functions/get-player-team.js"
import { getOpponentTeam } from "../../back-end/config/room-state/methods/get-opponent-team.js"
import { RoundPhase } from "../../types/room-state.js"

type Props = {
  appState: AppState
}

export function Instructions({ appState }: Props) {
  const { roomState, sessionId } = appState
  const instruction = pickInstruction(roomState, sessionId)
  const phaseName = getPhaseName(roomState)

  const clientTeam = getPlayerTeam(roomState, sessionId)
  const opponentTeam = getOpponentTeam(clientTeam)
  const opponentSecretWord = roomState.teams[opponentTeam].secretWord.value.toUpperCase()

  const clientIsOrator = roomState.players[sessionId].role === "orator"
  const isClientGuessingPhase = roomState.roundPhase === `guessing ${clientTeam}`
  const whileOpponentSecretDisplayed = isClientGuessingPhase && clientIsOrator

  return (
    <Box sx={style_container}>
      <Typography variant="h3" mb={1} sx={style_phaseName(roomState.roundPhase)}>
        {phaseName}
      </Typography>

      <Typography component="span">{instruction}</Typography>
      {whileOpponentSecretDisplayed && (
        <Typography component="span" sx={style_secretWord}>
          {opponentSecretWord}
        </Typography>
      )}
    </Box>
  )
}

const style_container: SxProps = {
  mx: { xs: 1, sm: 2 },
}

const style_phaseName = (roundPhase: RoundPhase): SxProps => {
  let color: string

  switch (roundPhase) {
    case "pre round":
    case "trapping":
      color = "text.primary"
      break
    case "pre guessing one":
    case "guessing one":
      color = "team.oneLight"
      break
    case "pre guessing two":
    case "guessing two":
      color = "team.twoLight"
      break
    default:
      color = "text.primary"
  }

  return {
    fontWeight: 900,
    color,
  }
}

const style_secretWord: SxProps = {
  color: "text.rule",
  fontWeight: 900,
  fontSize: 22,
  textDecorationLine: "underline",
  textDecorationStyle: "single",
  textDecorationThickness: "3px",
  textUnderlineOffset: "5px",
}

function getPhaseName(roomState: RoomState) {
  const playingTeam = getPlayingTeam.call(roomState)
  const playingTeamName = roomState.teams[playingTeam].color

  let phaseName = ""

  switch (roomState.roundAdvancement) {
    case 1:
      phaseName = "Début de manche"
      break
    case 2:
      phaseName = "Phase piège"
      break
    case 3:
    case 4:
    case 5:
    case 6:
      phaseName = `Phase oration ${playingTeamName}`
      break
    default:
      phaseName = "Error"
  }

  return phaseName
}

function pickInstruction(roomState: RoomState, sessionId: string) {
  const roundPhase = roomState.roundPhase
  const team = roomState.players[sessionId].team
  const role = roomState.players[sessionId].role

  /* eslint-disable sonarjs/no-duplicate-string */
  const teamOneSecretWord = roomState.teams.one.secretWord.value
  const teamTwoSecretWord = roomState.teams.two.secretWord.value
  const instructions = {
    "pre round": {
      one: {
        guesser:
          "La manche va commencer. Vous devrez chercher les mots qui ont le plus de chance d’être utilisés par l’orateur adverse pour faire deviner votre mot.",
        orator:
          "La manche va commencer. Vous devrez chercher les mots qui ont le plus de chance d’être utilisés par l’orateur adverse pour faire deviner votre mot.",
      },
      two: {
        guesser:
          "La manche va commencer. Vous devrez chercher les mots qui ont le plus de chance d’être utilisés par l’orateur adverse pour faire deviner votre mot.",
        orator:
          "La manche va commencer. Vous devrez chercher les mots qui ont le plus de chance d’être utilisés par l’orateur adverse pour faire deviner votre mot.",
      },
    },
    trapping: {
      one: {
        guesser: `Piégez les mots qui ont le plus de chance d’être utilisés par l’orateur adverse pour faire deviner le mot ${teamOneSecretWord.toUpperCase()}.`,
        orator: `Piégez les mots qui ont le plus de chance d’être utilisés par l’orateur adverse pour faire deviner le mot ${teamOneSecretWord.toUpperCase()}.`,
      },
      two: {
        guesser: `Piégez les mots qui ont le plus de chance d’être utilisés par l’orateur adverse pour faire deviner le mot ${teamTwoSecretWord.toUpperCase()}.`,
        orator: `Piégez les mots qui ont le plus de chance d’être utilisés par l’orateur adverse pour faire deviner le mot ${teamTwoSecretWord.toUpperCase()}.`,
      },
    },
    "pre guessing one": {
      one: {
        guesser: "Votre orateur va tenter de vous faire deviner un mot.",
        orator:
          "Vous allez devoir faire deviner un mot à votre auditoire. Attention ! Il faudra éviter les mots piégés par l’équipe adverse.",
      },
      two: {
        guesser: "L’orateur adverse va tenter de faire deviner à son auditoire le mot que vous avez piégé.",
        orator: "L’orateur adverse va tenter de faire deviner à son auditoire le mot que vous avez piégé.",
      },
    },
    "guessing one": {
      one: {
        guesser: "Tentez de deviner le mot décrit par votre orateur !",
        orator: `Vous devez faire deviner à votre auditoire le mot `,
      },
      two: {
        guesser:
          "Surveillez la performance de l’orateur adverse et si il utilise un des mots que vous avez piégé, activez le piège !",
        orator:
          "Surveillez la performance de l’orateur adverse et si il utilise un des mots que vous avez piégé, activez le piège !",
      },
    },
    "pre guessing two": {
      one: {
        guesser: "L’orateur adverse va tenter de faire deviner à son auditoire le mot que vous avez piégé.",
        orator: "L’orateur adverse va tenter de faire deviner à son auditoire le mot que vous avez piégé.",
      },
      two: {
        guesser: "Votre orateur va tenter de vous faire deviner un mot.",
        orator:
          "Vous allez devoir faire deviner un mot à votre auditoire. Attention ! Il faudra éviter les mots piégés par l’équipe adverse.",
      },
    },
    "guessing two": {
      one: {
        guesser:
          "Surveillez la performance de l’orateur adverse et si il utilise un des mots que vous avez piégé, activez le piège !",
        orator:
          "Surveillez la performance de l’orateur adverse et si il utilise un des mots que vous avez piégé, activez le piège !",
      },
      two: {
        guesser: "Tentez de deviner le mot décrit par votre orateur !",
        orator: `Vous devez faire deviner à votre auditoire le mot `,
      },
    },
  }

  return instructions[roundPhase][team][role]
}
