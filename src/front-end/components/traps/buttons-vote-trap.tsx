import { Stack } from "@mui/material"
import { AppState } from "../../../types/main.js"
import { ButtonVoteTrap } from "./button-vote-trap.js"

type Props = {
  appState: AppState
  index: number
}

export function ButtonsVoteTrap({ index, appState }: Props) {
  return (
    <Stack sx={style_buttonsThumb}>
      <ButtonVoteTrap voteType={true} trapIndex={index} appState={appState} />
      <ButtonVoteTrap voteType={false} trapIndex={index} appState={appState} />
    </Stack>
  )
}

const style_buttonsThumb = {
  flexDirection: "row",
  gap: 1,
}
