import { Dispatch, SetStateAction, useEffect } from "react"
import { FAKE_LOADING_DURATION } from "../../../config/app-constants.js"
import { AppState, FlowlessFunction } from "../../../types/types.js"
import { socket } from "../../config/initialize-socket-io.js"
import localStorageKeys from "../../config/local-storage-keys.js"

export function useSubscribeSocketIoConnection(setAppState: Dispatch<SetStateAction<AppState>>) {
  useEffect((): FlowlessFunction => {
    socket.on("joinRoom", (session) => {
      localStorage.setItem(localStorageKeys.sessionId, session.sessionId)

      //TODO: get the roomState

      setTimeout(
        () =>
          setAppState((prevAppState) => ({
            ...prevAppState,
            status: "logged",
            username: session.username,
            room: session.room,
          })),
        FAKE_LOADING_DURATION
      )
    })

    return () => socket.off("joinRoom")
  }, [setAppState])
}
