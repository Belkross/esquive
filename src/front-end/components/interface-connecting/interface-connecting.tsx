import { Dispatch, SetStateAction } from "react"
import Stack from "@mui/material/Stack"
import CircularProgress from "@mui/material/CircularProgress"
import Typography from "@mui/material/Typography"
import { AppState } from "../../../types/types.js"
import useSubscribeEventSocketIoConnection from "./use-subscribe-event-socket-io-connection.js"
import { SxProps } from "@mui/material"
import useSubscribeConnectError from "../form-logging/use-subscribe-connect-error.js"

type Props = {
  setAppState: Dispatch<SetStateAction<AppState>>
}

export default function InterfaceLoading({  setAppState }: Props) {
  useSubscribeConnectError(setAppState)
  useSubscribeEventSocketIoConnection(setAppState)

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
