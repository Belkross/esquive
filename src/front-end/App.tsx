import { useMemo, useState } from "react"
import { getInitialUsername } from "../functions/get-initial-username.js"
import { AppState } from "../types/types"
import { GlobalFeatures } from "./components/global-features.js"
import { InterfaceConnectingServer } from "./components/interface-connecting/interface-connecting-server.js"
import { InterfaceGame } from "./components/interface-game.js"
import { InterfaceLogging } from "./components/interface-logging/interface-logging.js"
import { InterfaceShared } from "./components/interface-shared.js"
import { initializeSocketIo } from "./config/initialize-socket-io.js"
import localStorageKeys from "./config/local-storage-keys.js"
import { useSubscribeLeaveRoom } from "./custom-hooks/use-subscribe-leave-room.js"

initializeSocketIo()
const initialAppState: AppState = {
  status: "connectingToSocketIo",
  username: getInitialUsername(localStorageKeys.username),
  room: undefined,
  roomState: undefined
}

export default function App() {
  const [appState, setAppState] = useState(initialAppState)
  const memoizedSetAppState = useMemo(() => setAppState, [])

  useSubscribeLeaveRoom(memoizedSetAppState)

  let appInterface
  switch (appState.status) {
    case "connectingToSocketIo":
      appInterface = <InterfaceConnectingServer setAppState={memoizedSetAppState} />
      break
    case "logging":
      appInterface = <InterfaceLogging appState={appState} setAppState={memoizedSetAppState} />
      break
    case "logged":
      appInterface = <InterfaceGame appState={appState}/>
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
