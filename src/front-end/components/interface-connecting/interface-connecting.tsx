import { Dispatch, SetStateAction } from "react"
import { AppState } from "../../../types/types.js"
import { CircularProgress, Stack, SxProps, Typography } from "@mui/material"
import { useSubscribeSocketIoConnection } from "./use-subscribe-socket-io-connection.js"
import { useSubscribeConnectError } from "../form-logging/use-subscribe-connect-error.js"

type Props = {
  setAppState: Dispatch<SetStateAction<AppState>>
}

export function InterfaceConnectingServer({ setAppState }: Props) {
  useSubscribeConnectError(setAppState)
  useSubscribeSocketIoConnection(setAppState)

  return (
    <Stack sx={style_container}>
      <Typography variant="h1">Esquive</Typography>
      <CircularProgress sx={style_circularProgress} />
      <Typography>Chargement...</Typography>
    </Stack>
  )
}

const style_container: SxProps = {
  alignItems: "center",
  gap: 4,
  marginTop: 3,
}

const style_circularProgress = {
  alignSelf: "center",
}
