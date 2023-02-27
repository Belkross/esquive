import { Stack, Typography } from "@mui/material"
import { Dispatch, SetStateAction } from "react"
import { AppState } from "../../../types/main"
import { FormLogging } from "../form-logging/form-logging.js"
import { LinkDiscord } from "../link-discord.js"

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
      <LinkDiscord />
    </Stack>
  )
}

const style_container = {
  gap: { thinest: 4, medium: 6 },
  justifyContent: "center",
  alignItems: "center",
  marginTop: 3,
  marginBottom: 3,
}

const style_title = {
  marginBottom: { xs: 4, md: 6 },
}
