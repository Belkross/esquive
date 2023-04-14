import { Stack } from "@mui/material"
import { AppState } from "../../../types/types.js"
import { ButtonVoteTrap } from "./button-vote-trap.js"

type Props = {
  appState: AppState
  trap: string
}

export function ButtonsVoteTrap({ trap, appState }: Props) {
  return (
    <Stack sx={style_buttonsThumb}>
      <ButtonVoteTrap voteType={true} trap={trap} appState={appState} />
      <ButtonVoteTrap voteType={false} trap={trap} appState={appState} />
    </Stack>
  )
}

const style_buttonsThumb = {
  flexDirection: "row",
  gap: 1,
}
