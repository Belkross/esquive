import { Dispatch, SetStateAction } from "react"
import Stack from "@mui/material/Stack"
import CircularProgress from "@mui/material/CircularProgress"
import Typography from "@mui/material/Typography"
import { AppState, AppStatus } from "../../../types/types.js"
import useSubscribeEventSocketIoConnection from "./use-subscribe-event-socket-io-connection.js"
import Paper from "@mui/material/Paper"

type Props = {
  appStatus: AppStatus
  setAppState: Dispatch<SetStateAction<AppState>>
}

export default function InterfaceLoading({ appStatus, setAppState }: Props) {
  let statusMessage
  switch (appStatus) {
    case "connectingToSocketIo":
      statusMessage = "Connexion au serveur..."
      break
    case "loadingApp":
      statusMessage = "Chargement de l’application..."
      break
    default:
      statusMessage = "Erreur"
  }

  useSubscribeEventSocketIoConnection(setAppState)

  return (
    <Stack sx={style_container}>
      <Paper sx={style_paper}>
        <CircularProgress sx={style_circularProgress} />
        <Typography>{statusMessage}</Typography>
      </Paper>
    </Stack>
  )
}

const style_container = {
  alignItems: "center",
  gap: 2,
}

const style_paper = {
  padding: 4,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  gap: { xs: 2, md: 4 },
  boxShadow: 4,
  maxWidth: "350px",
  maxHeight: "215px",
  width: "100%",
  height: { xs: "255px", sm: "215px" },
}

const style_circularProgress = {
  alignSelf: "center",
}
