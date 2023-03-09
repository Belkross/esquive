import { jsx as _jsx } from "react/jsx-runtime";
import { useMemo, useState } from "react";
import { RoomState } from "../back-end/config/room-state/room-state.js";
import { getInitialUsername } from "../functions/get-initial-username.js";
import { GlobalFeatures } from "./components/global-features.js";
import { InterfaceConnectingServer } from "./components/interface-connecting/interface-connecting-server.js";
import { InterfaceGame } from "./components/interface-game/interface-game.js";
import { InterfaceLogging } from "./components/interface-logging/interface-logging.js";
import { InterfaceShared } from "./components/interface-shared.js";
import { initializeSocketIo } from "./config/initialize-socket-io.js";
import storageKeys from "./config/storage-keys.js";
import { useSubscribeIntentionalDisconnection } from "./custom-hooks/use-subscribe-intentional-disconnection.js";
initializeSocketIo();
const initialAppState = {
    status: "connectingToSocketIo",
    username: getInitialUsername(storageKeys.username),
    sessionId: "",
    room: "",
    roomState: new RoomState("", ""),
};
export default function App() {
    const [appState, setAppState] = useState(initialAppState);
    const memoizedSetAppState = useMemo(() => setAppState, []);
    useSubscribeIntentionalDisconnection(memoizedSetAppState);
    let appInterface;
    switch (appState.status) {
        case "connectingToSocketIo":
            appInterface = _jsx(InterfaceConnectingServer, { setAppState: memoizedSetAppState });
            break;
        case "logging":
            appInterface = _jsx(InterfaceLogging, { appState: appState, setAppState: memoizedSetAppState });
            break;
        case "logged":
            appInterface = _jsx(InterfaceGame, { appState: appState, setAppState: memoizedSetAppState });
            break;
        default:
            appInterface = _jsx("h1", { children: "Error" });
    }
    return (_jsx(GlobalFeatures, { children: _jsx(InterfaceShared, { children: appInterface }) }));
}
