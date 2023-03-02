import { Dispatch, SetStateAction, useEffect } from "react"
import { AppState, FlowlessFunction } from "../../../types/main.js"
import { socket } from "../../config/initialize-socket-io.js"
import storageKeys from "../../config/storage-keys.js"
import { FAKE_LOADING_DURATION } from "./interface-connecting-server.js"

export function useSubscribeSocketIoConnection(setAppState: Dispatch<SetStateAction<AppState>>) {
  useEffect((): FlowlessFunction => {
    socket.on("joinRoom", (sessionId, roomState) => {
      sessionStorage.setItem(storageKeys.sessionId, sessionId)

      setTimeout(
        () =>
          setAppState((prevAppState) => ({
            ...prevAppState,
            status: "logged",
            username: roomState.players[sessionId].username,
            sessionId,
            room: roomState.roomName,
            roomState: roomState,
          })),
        FAKE_LOADING_DURATION
      )
    })

    return () => socket.off("joinRoom")
  }, [setAppState])
}
