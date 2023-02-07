import { useState } from "react"
import GlobalFeatures from "./components/global-features"
import InterfaceShared from "./components/interface-shared"
import InterfaceGame from "./components/interface-game"
import initializeSocketIo from "./config/initialize-socket-io"
import { AppState } from "../types/types"
import getInitialUsername from "../functions/get-initial-username"
import localStorageKeys from "./config/local-storage-keys"
import InterfaceLoading from "./components/interface-loading/interface-loading"

initializeSocketIo()
const initialAppState: AppState = {
  status: "connectingToSocketIo",
  username: getInitialUsername(localStorageKeys.username),
  room: null,
}

function App() {
  const [appState, setAppState] = useState(initialAppState)

  console.log(setAppState)
  let appInterface
  switch (appState.status) {
    case "connectingToSocketIo":
    case "loadingApp":
      appInterface = <InterfaceLoading appStatus={appState.status} setAppState={setAppState} />
      break
    case "logging":
      appInterface = <h1>interface logging</h1>
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

export default App
