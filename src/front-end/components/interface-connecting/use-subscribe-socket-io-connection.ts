import { Dispatch, SetStateAction, useEffect } from "react"
import { FAKE_LOADING_DURATION } from "../../../config/app-constants.js"
import { AppState, FlowlessFunction } from "../../../types/main.js"
import { socket } from "../../config/initialize-socket-io.js"
import storageKeys from "../../config/storage-keys.js"

export function useSubscribeSocketIoConnection(setAppState: Dispatch<SetStateAction<AppState>>) {
  useEffect((): FlowlessFunction => {
    socket.on("joinRoom", (browserId, roomState) => {
      sessionStorage.setItem(storageKeys.browserId, browserId)

      setTimeout(
        () =>
          setAppState((prevAppState) => ({
            ...prevAppState,
            status: "logged",
            username: roomState.players[browserId].username,
            browserId,
            room: roomState.roomName,
            roomState: roomState,
          })),
        FAKE_LOADING_DURATION
      )
    })

    return () => socket.off("joinRoom")
  }, [setAppState])
}
