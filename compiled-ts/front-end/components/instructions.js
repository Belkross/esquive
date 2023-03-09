import { jsx as _jsx } from "react/jsx-runtime";
import { Typography } from "@mui/material";
export function Instructions({ appState }) {
    const instruction = pickInstruction(appState.roomState, appState.sessionId);
    return _jsx(Typography, { sx: style_typography, children: instruction });
}
const style_typography = {
    mx: { xs: 1, sm: 2 },
};
function pickInstruction(roomState, sessionId) {
    const roundPhase = roomState.roundPhase;
    const team = roomState.players[sessionId].team;
    const role = roomState.players[sessionId].role;
    /* eslint-disable sonarjs/no-duplicate-string */
    const teamOneSecretWord = roomState.teams.one.secretWord.value;
    const teamTwoSecretWord = roomState.teams.two.secretWord.value;
    const instructions = {
        "pre round": {
            one: {
                guesser: "La manche va commencer. Vous devrez chercher les mots qui ont le plus de chance d’être utilisés par l’orateur adverse pour faire deviner votre mot.",
                orator: "La manche va commencer. Vous devrez chercher les mots qui ont le plus de chance d’être utilisés par l’orateur adverse pour faire deviner votre mot.",
            },
            two: {
                guesser: "La manche va commencer. Vous devrez chercher les mots qui ont le plus de chance d’être utilisés par l’orateur adverse pour faire deviner votre mot.",
                orator: "La manche va commencer. Vous devrez chercher les mots qui ont le plus de chance d’être utilisés par l’orateur adverse pour faire deviner votre mot.",
            },
        },
        trapping: {
            one: {
                guesser: `Piégez les mots qui ont le plus de chance d’être utilisés par l’orateur adverse pour faire deviner votre mot.`,
                orator: `Piégez les mots qui ont le plus de chance d’être utilisés par l’orateur adverse pour faire deviner votre mot.`,
            },
            two: {
                guesser: `Piégez les mots qui ont le plus de chance d’être utilisés par l’orateur adverse pour faire deviner votre mot.`,
                orator: `Piégez les mots qui ont le plus de chance d’être utilisés par l’orateur adverse pour faire deviner votre mot.`,
            },
        },
        "pre guessing one": {
            one: {
                guesser: "Votre orateur va tenter de vous faire deviner un mot.",
                orator: "Vous allez devoir faire deviner un mot à votre auditoire. Attention ! Il faudra éviter les mots piégés par l’équipe adverse.",
            },
            two: {
                guesser: "L’orateur adverse va tenter de faire deviner à son auditoire le mot que vous avez piégé.",
                orator: "L’orateur adverse va tenter de faire deviner à son auditoire le mot que vous avez piégé.",
            },
        },
        "guessing one": {
            one: {
                guesser: "Tentez de deviner le mot décrit par votre orateur !",
                orator: `Vous devez faire deviner à votre auditoire le mot ${teamTwoSecretWord.toUpperCase()} !`,
            },
            two: {
                guesser: "Surveillez la performance de l’orateur adverse et si il utilise un des mots que vous avez piégé, activez le piège !",
                orator: "Surveillez la performance de l’orateur adverse et si il utilise un des mots que vous avez piégé, activez le piège !",
            },
        },
        "pre guessing two": {
            one: {
                guesser: "L’orateur adverse va tenter de faire deviner à son auditoire le mot que vous avez piégé.",
                orator: "L’orateur adverse va tenter de faire deviner à son auditoire le mot que vous avez piégé.",
            },
            two: {
                guesser: "Votre orateur va tenter de vous faire deviner un mot.",
                orator: "Vous allez devoir faire deviner un mot à votre auditoire. Attention ! Il faudra éviter les mots piégés par l’équipe adverse.",
            },
        },
        "guessing two": {
            one: {
                guesser: "Surveillez la performance de l’orateur adverse et si il utilise un des mots que vous avez piégé, activez le piège !",
                orator: "Surveillez la performance de l’orateur adverse et si il utilise un des mots que vous avez piégé, activez le piège !",
            },
            two: {
                guesser: "Tentez de deviner le mot décrit par votre orateur !",
                orator: `Vous devez faire deviner à votre auditoire le mot ${teamOneSecretWord.toUpperCase()} !`,
            },
        },
    };
    return instructions[roundPhase][team][role];
}
