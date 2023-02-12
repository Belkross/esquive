import { Dispatch, SetStateAction, useEffect, useRef } from "react"
import { FAKE_LOADING_DURATION } from "../../../config/app-constants.js"
import { AppState, FlowlessFunction } from "../../../types/types.js"
import { socket } from "../../config/initialize-socket-io.js"
import localStorageKeys from "../../config/local-storage-keys.js"

export default function useSubscribeEventSocketIoConnection(setAppState: Dispatch<SetStateAction<AppState>>) {
  const setAppStateRef = useRef(setAppState)

  useEffect((): FlowlessFunction => {
    socket.on("clientJoinedRoom", (session) => {
      localStorage.setItem(localStorageKeys.sessionId, session.sessionId)

      //TODO: get the roomState

      setTimeout(
        () =>
          setAppStateRef.current((prevAppState) => ({
            ...prevAppState,
            status: "logged",
            username: session.username,
            room: session.room,
          })),
        FAKE_LOADING_DURATION
      )
    })

    return () => socket.off("clientJoinedRoom")
  }, [])
}
