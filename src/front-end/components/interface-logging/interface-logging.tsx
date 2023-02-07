import { Dispatch, SetStateAction } from "react"
import Typography from "@mui/material/Typography"
import Stack from "@mui/material/Stack"
import { AppState } from "../../../types/types"
import ButtonDiscord from "../button-discord"
import FormLogging from "../form-logging/form-logging"

export type InterfaceLoggingProps = {
  appState: AppState
  setAppState: Dispatch<SetStateAction<AppState>>
}

export default function InterfaceLogging({ appState, setAppState }: InterfaceLoggingProps) {
  return (
    <Stack sx={style_container}>
      <Typography variant="h1" sx={style_title}>
        Esquive
      </Typography>
      <FormLogging appState={appState} setAppState={setAppState} />
      <ButtonDiscord />
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
