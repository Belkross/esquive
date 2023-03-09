import { Stack, SxProps, Typography } from "@mui/material"
import { Dispatch, SetStateAction } from "react"
import { AppState } from "../../../types/main"
import shape from "../../theme/shape.js"
import { FormLogging } from "./form-logging.js"
import Introduction from "../introduction/introduction.js"

export type InterfaceLoggingProps = {
  appState: AppState
  setAppState: Dispatch<SetStateAction<AppState>>
}

export function InterfaceLogging({ appState, setAppState }: InterfaceLoggingProps) {
  return (
    <Stack sx={style_container}>
      <Typography variant="h1" sx={style_title}>
        Esquive
      </Typography>
      <FormLogging appState={appState} setAppState={setAppState} />
      <Introduction />
    </Stack>
  )
}

const style_container: SxProps = {
  gap: shape.spacingBase,
  padding: shape.spacingBase,
  alignItems: "center",
  overflowY: "scroll",
  width: "100%",
}

const style_title: SxProps = {
  marginBottom: { xs: 2, md: 4 },
}
