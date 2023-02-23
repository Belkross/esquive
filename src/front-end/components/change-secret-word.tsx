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
      {duringTrappingPhase && (
        <Stack sx={style_buttons}>
          <ButtonChangeSecretWord appState={appState} />
          <ButtonGroupVoteSecretWord appState={appState} />
        </Stack>
      )}

      <Typography>mot à piéger: {secretWord}</Typography>
    </Stack>
  )
}

const style_container: SxProps = {
  flexDirection: "column",
  gap: { xs: 1, sm: 2 },
  px: 1,
  alignItems: "center",
}

const style_buttons: SxProps = {
  width: "100%",
  flexDirection: "row",
  alignItems: { xs: "center", sm: "center" },
  justifyContent: "center",
  gap: 1,
}
