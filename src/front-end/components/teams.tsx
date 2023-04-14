import { ButtonChangeRole } from "./button-change-role/button-change-role.js"
import { AppState } from "../../types/types.js"
import { Stack, SxProps } from "@mui/material"

type Props = {
  appState: AppState
}

export function Teams({ appState }: Props) {
  return (
    <Stack sx={style_container}>
      <Stack sx={style_teamContainer}>
        <ButtonChangeRole team="one" role="orator" appState={appState} />
        <ButtonChangeRole team="one" role="guesser" appState={appState} />
      </Stack>
      <Stack sx={style_teamContainer}>
        <ButtonChangeRole team="two" role="orator" appState={appState} />
        <ButtonChangeRole team="two" role="guesser" appState={appState} />
      </Stack>
    </Stack>
  )
}

const style_container: SxProps = {
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "start",
  gap: 5,

  gridRow: "2/7",
  gridColumn: "10/13",
  alignSelf: "center",
  justifySelf: "start",
}

const style_teamContainer: SxProps = {
  flexDirection: "column",
  alignItems: "start",
  gap: 2,
}
