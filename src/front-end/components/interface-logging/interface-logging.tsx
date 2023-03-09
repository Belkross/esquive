import { Stack, SxProps, Typography } from "@mui/material"
import { Dispatch, SetStateAction } from "react"
import { AppState } from "../../../types/main"
import { Introduction } from "../introduction/introduction.js"
import { FormLogging } from "./form-logging.js"

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
  display: { xs: "flex", lg: "grid" },
  gridTemplateColumns: "repeat(12, 1fr)",
  gridTemplateRows: "repeat(12, 1fr)",
  alignItems: { xs: "center", lg: "center" },
  gap: { xs: 3, sm: 4, lg: "none" },
  rowGap: 3,
  columnGap: 4,
  justifyItems: "center",

  overflowY: "scroll",
  width: "100%",
  height: "100%",

  padding: { xs: 2, sm: 3, md: 8, lg: 4 },
}

const style_title: SxProps = {
  marginBottom: { xs: 2, md: 4 },
  gridRow: "1/3",
  gridColumn: "1/13",
}
