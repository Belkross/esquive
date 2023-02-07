import { Dispatch, SetStateAction, useEffect, useRef } from "react"
import { FAKE_LOADING_DURATION } from "../../../config/app-constants.js"
import { AppState, FlowlessFunction } from "../../../types/types.js"
import { socket } from "../../config/initialize-socket-io.js"

export default function useSubscribeEventSocketIoConnection(setAppState: Dispatch<SetStateAction<AppState>>) {
  const setAppStateRef = useRef(setAppState)

  useEffect((): FlowlessFunction => {
    socket.on("connectedToSocketIo", () => endConnectionToSocketIo(setAppStateRef.current))

    return () => socket.off("connectedToSocketIo")
  }, [])
}

function endConnectionToSocketIo(setAppState: Dispatch<SetStateAction<AppState>>): void {
  setAppState((prevAppState) => ({ ...prevAppState, status: "loadingApp" }))

  setTimeout(() => setAppState((prevAppState) => ({ ...prevAppState, status: "logging" })), FAKE_LOADING_DURATION)
}
