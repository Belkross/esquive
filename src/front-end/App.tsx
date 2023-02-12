import { useState } from "react"
import GlobalFeatures from "./components/global-features"
import InterfaceShared from "./components/interface-shared"
import InterfaceGame from "./components/interface-game"
import initializeSocketIo from "./config/initialize-socket-io"
import { AppState } from "../types/types"
import getInitialUsername from "../functions/get-initial-username"
import localStorageKeys from "./config/local-storage-keys"
import InterfaceConnecting from "./components/interface-connecting/interface-connecting"
import InterfaceLogging from "./components/interface-logging/interface-logging"

initializeSocketIo()
const initialAppState: AppState = {
  status: "connectingToSocketIo",
  username: getInitialUsername(localStorageKeys.username),
  room: null,
}

export default function App() {
  const [appState, setAppState] = useState(initialAppState)

  let appInterface
  switch (appState.status) {
    case "connectingToSocketIo":
      appInterface = <InterfaceConnecting setAppState={setAppState} />
      break
    case "logging":
      appInterface = <InterfaceLogging appState={appState} setAppState={setAppState} />
      break
    case "logged":
      appInterface = <InterfaceGame />
      break
    default:
      appInterface = <h1>Error</h1>
  }

  return (
    <GlobalFeatures>
      <InterfaceShared>{appInterface}</InterfaceShared>
    </GlobalFeatures>
  )
}
