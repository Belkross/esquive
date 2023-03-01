import { Box, Stack, SxProps, useMediaQuery, useTheme } from "@mui/material"
import { Dispatch, SetStateAction } from "react"
import { AppState } from "../../../types/main.js"
import shape from "../../theme/shape.js"
import { AdminButtons } from "../admin-buttons.js"
import { ApplicationBar } from "../application-bar.js"
import { ButtonReportForbiddenClue } from "../button-report-forbidden-clue.js"
import { ButtonSubmitWord } from "../button-submit-word/button-submit-word.js"
import { ChangeSecretWord } from "../change-secret-word.js"
import { GameHistoric } from "../game-historic/game-historic.js"
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
  const breakpoint_xl = useMediaQuery(useTheme().breakpoints.up("xl"))

  useSubscribeRoomStateUpdate(setAppState)

  return (
    <>
      <ApplicationBar appState={appState} />
      <Score roomState={appState.roomState} />
      <Box sx={style_board}>
        <Stack sx={style_partOne}>
          <Stack sx={style_buttons}>
            <ButtonSubmitWord appState={appState} />
            <AdminButtons appState={appState} />
          </Stack>
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

const style_buttons: SxProps = {
  flexFlow: "row nowrap",
  justifyContent: "space-between",
  alignItems: "center",
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
  px: { xs: 1.5, sm: 2, md: 3 },
  py: { xs: 3 },
  minHeight: { xs: "450px", sm: "500px" },
  maxWidth: "450px",
  maxHeight: "640px", //8 traps + vote secret word height
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
  gap: { xs: 3, md: 4 },
  gridColumn: { xs: "1/13", lg: "1/7", xl: "1/6" },
}

const style_partTwo: SxProps = {
  ...style_boardPart,
  gridColumn: { xs: "1/13", lg: "7/13", xl: "6/11" },
}
