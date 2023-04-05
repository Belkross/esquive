import { useState } from "react"
import { RoomState } from "../back-end/config/room-state/room-state.js"
import { getInitialUsername } from "../functions/get-initial-username.js"
import { AppState } from "../types/main.js"
import { GlobalFeatures } from "./components/global-features.js"
import { InterfaceConnectingServer } from "./components/interface-connecting/interface-connecting-server.js"
import { InterfaceGame } from "./components/interface-game/interface-game.js"
import { InterfaceLogging } from "./components/interface-logging/interface-logging.js"
import { initializeSocketIo } from "./config/initialize-socket-io.js"
import storageKeys from "./config/storage-keys.js"
import { useSubscribeIntentionalDisconnection } from "./custom-hooks/use-subscribe-intentional-disconnection.js"

initializeSocketIo()
const initialAppState: AppState = {
  status: "connectingToSocketIo",
  username: getInitialUsername(storageKeys.username),
  sessionId: "",
  room: "",
  roomState: new RoomState("", ""),
}

export default function App() {
  const [appState, setAppState] = useState(initialAppState)

  useSubscribeIntentionalDisconnection(setAppState)

  let appInterface
  switch (appState.status) {
    case "connectingToSocketIo":
      appInterface = <InterfaceConnectingServer setAppState={setAppState} />
      break
    case "logging":
      appInterface = <InterfaceLogging appState={appState} setAppState={setAppState} />
      break
    case "logged":
      appInterface = <InterfaceGame appState={appState} setAppState={setAppState} />
      break
    default:
      appInterface = <h1>Error</h1>
  }

  return <GlobalFeatures>{appInterface}</GlobalFeatures>
}
