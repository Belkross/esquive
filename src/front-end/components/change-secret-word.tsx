import { Stack, Typography } from "@mui/material"
import { Team } from "../../back-end/config/room-state.js"
import { getClientTeam } from "../../functions/get-client-team.js"
import { AppState } from "../../types/main.js"
import { ButtonChangeSecretWord } from "./button-change-secret-word/button-change-secret-word.js"
import { VoteSecretWordButtons } from "./button-change-secret-word/vote-secret-word-feature.js"


type Props = {
  appState: AppState
}

export function ChangeSecretWord({ appState }: Props) {
  const { roomState, browserId } = appState
  const team = getClientTeam(roomState, browserId)
  const secretWord = roomState.teams[team].secretWord
  const duringTrappingPhase = roomState.roundPhase === "trapping"

  return (
    <Stack sx={style_container(team)}>
      <ButtonChangeSecretWord appState={appState} />
      <Stack sx={style_stackSecretWord}>
        <Typography>mot à piéger: {secretWord}</Typography>
        {duringTrappingPhase && <VoteSecretWordButtons appState={appState} />}
      </Stack>
    </Stack>
  )
}

const style_container = (team: Team) => ({
  flexDirection: "row",
  gap: { xs: 1, sm: 2 },
  py: 2,
  px: 2,
  borderBottom: "3px solid",
  borderColor: team === "one" ? "teamOne.main" : "teamTwo.main",
  alignItems: "center"
})

const style_stackSecretWord = {
  flexDirection: { xs: "column", sm: "row" },
  alignItems: { xs: "start", sm: "center" },
  gap: 1,
}
