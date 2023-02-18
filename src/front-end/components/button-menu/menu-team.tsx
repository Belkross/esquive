import { AppState } from "../../../types/main.js"
import { Teams } from "../teams.js"

type Props = {
  appState: AppState
}
export function MenuTeam({ appState }: Props) {
  return (
    <>
      <Teams appState={appState} />
    </>
  )
}
