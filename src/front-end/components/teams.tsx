import { ButtonChangeRole } from "./button-change-role/button-change-role.js"
import { AppState } from "../../types/main.js"
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
  
  gridColumn: { xl: "11/13", xxl: "10/13" },
  gridRow: "3/13",
  justifySelf: "start",
  alignSelf: "center",
}

const style_teamContainer: SxProps = {
  flexDirection: "column",
  alignItems: "start",
  gap: 2,
}
