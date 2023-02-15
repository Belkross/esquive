import { RoomState } from "../../back-end/config/room-state.js"
import { AppState } from "../../types/types.js"
import { ApplicationBar } from "./application-bar.js"
import { Score } from "./score/score.js"

type Props = {
  appState: AppState
}

export function InterfaceGame({ appState }: Props) {
  const roomState = appState.roomState as RoomState

  return (
    <>
      <Score roomState={roomState} />
      <ApplicationBar />
    </>
  )
}
