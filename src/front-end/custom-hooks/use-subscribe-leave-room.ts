import { Dispatch, SetStateAction, useEffect } from "react"
import { AppState, FlowlessFunction } from "../../types/main.js"
import { socket } from "../config/initialize-socket-io.js"

export function useSubscribeLeaveRoom(setAppState: Dispatch<SetStateAction<AppState>>) {
  useEffect((): FlowlessFunction => {
    socket.on("leaveRoom", () => {
      socket.disconnect()
      setAppState((prevAppState) => ({ ...prevAppState, status: "logging", room: undefined }))
    })

    return () => socket.off("leaveRoom")
  }, [setAppState])
}
