import { Stack, SxProps, Typography } from "@mui/material"
import { getPlayerTeam } from "../../functions/get-player-team.js"
import { AppState } from "../../types/main.js"
import { ButtonChangeSecretWord } from "./button-change-secret-word/button-change-secret-word.js"
import { ButtonGroupVoteSecretWord } from "./button-change-secret-word/button-group-vote-secret-word.js"

type Props = {
  appState: AppState
}

export function ChangeSecretWord({ appState }: Props) {
  const { roomState, sessionId } = appState
  const team = getPlayerTeam(roomState, sessionId)
  const secretWord = roomState.teams[team].secretWord.value
  const duringTrappingPhase = roomState.roundPhase === "trapping"

  return (
    <Stack sx={style_container}>
      <Typography variant="h3">Mot à piéger : {secretWord}</Typography>

      {duringTrappingPhase && (
        <Stack sx={style_buttons}>
          <ButtonChangeSecretWord appState={appState} />
          <ButtonGroupVoteSecretWord appState={appState} />
        </Stack>
      )}
    </Stack>
  )
}

const style_container: SxProps = {
  flexDirection: "column",
  gap: { xs: 2, sm: 2 },
  px: 1,
  alignItems: "center",
  marginBottom: 5,
}

const style_buttons: SxProps = {
  width: "100%",
  flexDirection: "row",
  alignItems: { xs: "center", sm: "center" },
  justifyContent: "center",
  gap: 1,
}
