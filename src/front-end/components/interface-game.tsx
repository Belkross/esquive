import { Stack } from "@mui/material"
import { Dispatch, SetStateAction } from "react"
import { Team } from "../../back-end/config/room-state.js"
import { getClientTeam } from "../../functions/get-client-team.js"
import { AppState } from "../../types/main.js"
import { AdminButtons } from "./admin-buttons.js"
import { ApplicationBar } from "./application-bar.js"
import { ButtonReportForbiddenClue } from "./button-report-forbidden-clue.js"
import { ChangeSecretWord } from "./change-secret-word.js"
import { GameHistoric } from "./game-historic.js"
import { Instructions } from "./instructions.js"
import { Score } from "./score/score.js"
import { TrapsRemaining } from "./traps-remaining.js"

export type InterfaceGameProps = {
  appState: AppState
  setAppState: Dispatch<SetStateAction<AppState>>
}

export function InterfaceGame({ appState, setAppState }: InterfaceGameProps) {
  const clientIsAdmin = appState.roomState.players[appState.browserId].isAdmin
  const clientTeam = getClientTeam(appState.roomState, appState.browserId)

  return (
    <>
      <ApplicationBar appState={appState} setAppState={setAppState} />
      <Score roomState={appState.roomState} />
      {clientIsAdmin && <AdminButtons appState={appState} />}
      <Instructions appState={appState} />
      <GameHistoric appState={appState} />
      <Stack sx={style_container(clientTeam)}>
        <ChangeSecretWord appState={appState} />
        <ButtonReportForbiddenClue appState={appState} />
        <TrapsRemaining appState={appState} />
        {/* <Traps team={clientTeam} /> */}
      </Stack>
    </>
  )
}

const style_container = (team: Team) => ({
  width: "100%",
  borderWidth: "3px",
  borderStyle: "solid",
  borderColor: team === "one" ? "teamOne.main" : "teamTwo.main",
  borderLeft: { sm: "none" },
  height: "100%",
  backgroundColor: "background.paper",
  paddingBottom: 2,
  paddingTop: 1,
})
