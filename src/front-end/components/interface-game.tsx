import { Dispatch, SetStateAction } from "react"
import { AppState } from "../../types/main.js"
import { AdminButtons } from "./admin-buttons.js"
import { ApplicationBar } from "./application-bar.js"
import { Score } from "./score/score.js"

export type InterfaceGameProps = {
  appState: AppState
  setAppState: Dispatch<SetStateAction<AppState>>
}

export function InterfaceGame({ appState, setAppState }: InterfaceGameProps) {
  const clientIsAdmin = appState.roomState.players[appState.browserId].isAdmin

  return (
    <>
      <Score roomState={appState.roomState} />
      {clientIsAdmin && <AdminButtons appState={appState} />}
      <ApplicationBar appState={appState} setAppState={setAppState} />
    </>
  )
}
