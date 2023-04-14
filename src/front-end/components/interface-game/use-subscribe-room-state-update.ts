import { useContext, useEffect } from "react"
import { AppState, FlowlessFunction, setState } from "../../../types/types.js"
import { socket } from "../../config/initialize-socket-io.js"
import { SoundActivationContext } from "../provider-sound-activation.js"
import { listenToEventRequiringASound } from "./listen-to-event-requiring-a-sound.js"

export function useSubscribeRoomStateUpdate(setAppState: setState<AppState>) {
  const soundActivation = useContext(SoundActivationContext)

  useEffect((): FlowlessFunction => {
    socket.on("roomStateUpdate", (roomState) => {
      setAppState((prevAppState) => {
        if (soundActivation) listenToEventRequiringASound(prevAppState.roomState, roomState)

        return { ...prevAppState, roomState }
      })
    })

    return () => socket.off("roomStateUpdate")
  }, [setAppState, soundActivation])
}
