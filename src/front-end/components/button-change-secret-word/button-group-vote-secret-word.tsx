import { Stack } from "@mui/material"
import { AppState } from "../../../types/main.js"
import { ButtonVoteSecretWord } from "./button-vote-secret-word.js"

type Props = {
  appState: AppState
}

export function ButtonGroupVoteSecretWord({ appState }: Props) {
  return (
    <Stack sx={style_thumbButtons}>
      <ButtonVoteSecretWord voteType={true} appState={appState} />
      <ButtonVoteSecretWord voteType={false} appState={appState} />
    </Stack>
  )
}

const style_thumbButtons = {
  flexDirection: "row",
  gap: 1,
}
