import { Stack, SxProps } from "@mui/material"
import { Dispatch, SetStateAction } from "react"
import { AppState } from "../../../types/main.js"
import { AdminButtons } from "../admin-buttons.js"
import { ApplicationBar } from "../application-bar.js"
import { ButtonReportForbiddenClue } from "../button-report-forbidden-clue.js"
import { ChangeSecretWord } from "../change-secret-word.js"
import { GameHistoric } from "../game-historic.js"
import { Instructions } from "../instructions.js"
import { Score } from "../score/score.js"
import { TrapsRemaining } from "../traps-remaining.js"
import { Traps } from "../traps/traps.js"
import { useSubscribeCloseDuplicatedSessions } from "./use-subscribe-close-duplicated-sessions.js"
import { useSubscribeRoomStateUpdate } from "./use-subscribe-room-state-update.js"

export type InterfaceGameProps = {
  appState: AppState
  setAppState: Dispatch<SetStateAction<AppState>>
}

export function InterfaceGame({ appState, setAppState }: InterfaceGameProps) {
  const clientIsAdmin = appState.roomState.players[appState.browserId].isAdmin

  useSubscribeCloseDuplicatedSessions(appState, setAppState)
  useSubscribeRoomStateUpdate(setAppState)

  return (
    <>
      <ApplicationBar appState={appState} setAppState={setAppState} />
      <Stack sx={style_partOne}>
        <Score roomState={appState.roomState} />
        {clientIsAdmin && <AdminButtons appState={appState} />}
        <Instructions appState={appState} />
        <GameHistoric appState={appState} />
      </Stack>
      <Stack sx={style_partTwo}>
        <ChangeSecretWord appState={appState} />
        <ButtonReportForbiddenClue appState={appState} />
        <TrapsRemaining appState={appState} />
        <Traps appState={appState} />
      </Stack>
    </>
  )
}

const style_partOne: SxProps = {
  marginBottom: 4,
}

const style_partTwo: SxProps = {
  width: "100%",
  borderLeft: { sm: "none" },
  height: "100%",
  paddingBottom: 2,
  paddingTop: 1,
}
