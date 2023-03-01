import { Box, Stack, SxProps, useMediaQuery, useTheme } from "@mui/material"
import { Dispatch, SetStateAction } from "react"
import { AppState } from "../../../types/main.js"
import shape from "../../theme/shape.js"
import { AdminButtons } from "../admin-buttons.js"
import { ApplicationBar } from "../application-bar.js"
import { ButtonReportForbiddenClue } from "../button-report-forbidden-clue.js"
import { ChangeSecretWord } from "../change-secret-word.js"
import { GameHistoric } from "../game-historic.js"
import { Instructions } from "../instructions.js"
import { Score } from "../score/score.js"
import { Teams } from "../teams.js"
import { TrapsRemaining } from "../traps-remaining.js"
import { Traps } from "../traps/traps.js"
import { useSubscribeRoomStateUpdate } from "./use-subscribe-room-state-update.js"

export type InterfaceGameProps = {
  appState: AppState
  setAppState: Dispatch<SetStateAction<AppState>>
}

export function InterfaceGame({ appState, setAppState }: InterfaceGameProps) {
  const clientIsAdmin = appState.roomState.players[appState.sessionId].isAdmin
  const breakpoint_xl = useMediaQuery(useTheme().breakpoints.up("xl"))

  useSubscribeRoomStateUpdate(setAppState)

  return (
    <>
      <ApplicationBar appState={appState} />
      <Score roomState={appState.roomState} />
      <Box sx={style_board}>
        <Stack sx={style_partOne}>
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
        {breakpoint_xl && <Teams appState={appState} />}
      </Box>
    </>
  )
}

const style_board: SxProps = {
  display: { xs: "block", lg: "grid" },
  gridTemplateColumns: "repeat(12, 1fr)",
  columnGap: 4,
}

const style_boardPart: SxProps = {
  width: "100%",
  marginBottom: 2,
  boxShadow: 12,
  padding: { xs: 1.5, sm: 2, md: 3 },
  minHeight: { xs: "400px", sm: "500px" },
  maxWidth: "450px",
  backgroundColor: "background.paper",
  borderWidth: shape.borderWidth,
  borderStyle: "solid",
  borderColor: "background.borderPaper",
  borderRadius: shape.borderRadius,
}

const style_partOne: SxProps = {
  ...style_boardPart,
  display: "flex",
  flexFlow: "column nowrap",
  alignItems: "stretch",
  gap: { xs: 2, sm: 3, md: 4 },
  gridColumn: { xs: "1/13", lg: "1/7", xl: "1/6" },
}

const style_partTwo: SxProps = {
  ...style_boardPart,
  gridColumn: { xs: "1/13", lg: "7/13", xl: "6/11" },
}
