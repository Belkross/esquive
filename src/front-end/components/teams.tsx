import { ButtonChangeRole } from "./button-change-role/button-change-role.js"
import { AppState } from "../../types/main.js"
import { Stack } from "@mui/material"

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

const style_container = {
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: 5,
}

const style_teamContainer = {
  flexDirection: "column",
  alignItems: "start",
  gap: 2,
}
