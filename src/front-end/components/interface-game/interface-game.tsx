import { Stack, SxProps, useMediaQuery, useTheme } from "@mui/material"
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
      <Stack sx={style_board}>
        <Score roomState={appState.roomState} />

        <Stack sx={style_borderedPartOne}>
          <Stack sx={style_buttons}>
            <ButtonSubmitWord appState={appState} />
            <AdminButtons appState={appState} />
          </Stack>
          <Instructions appState={appState} />
          <GameHistoric appState={appState} />
        </Stack>

        <Stack sx={style_borderedPartTwo}>
          <ChangeSecretWord appState={appState} />
          <ButtonReportForbiddenClue appState={appState} />
          <TrapsRemaining appState={appState} />
          <Traps appState={appState} />
        </Stack>

        {breakpoint_xl && <Teams appState={appState} />}
      </Stack>
    </>
  )
}

const style_board: SxProps = {
  display: { xs: "flex", lg: "grid" },
  gridTemplateColumns: "repeat(12, 1fr)",
  gridTemplateRows: "repeat(12, 1fr)",
  alignItems: "center",
  gap: { xs: 3, sm: 4, lg: "none" },
  rowGap: 3,
  columnGap: 4,
  justifyItems: "center",

  overflowY: "scroll",
  width: "100%",
  height: "100%",

  padding: { xs: 2, sm: 3, md: 4 },
}

const style_borderedBoardPart: SxProps = {
  width: "100%",
  maxWidth: "500px",
  minHeight: { xs: "450px", sm: "500px" },
  maxHeight: "640px", //8 traps + vote secret word height
  gridRow: "3/13",
  alignSelf: { xs: "center", lg: "start" },

  marginBottom: 2,
  margin: 0,
  px: { xs: 1.5, sm: 2, md: 3 },
  py: { xs: 3 },

  boxShadow: 12,
  backgroundColor: "background.paper",
  borderWidth: shape.borderWidth,
  borderStyle: shape.borderStyle,
  borderColor: "background.border",
  borderRadius: shape.borderRadius,
}

const style_borderedPartOne: SxProps = {
  ...style_borderedBoardPart,
  display: "flex",
  flexFlow: "column nowrap",
  alignItems: "stretch",
  gap: { xs: 3, md: 4 },
  gridColumn: { xs: "1/13", lg: "1/7", xl: "1/6" },
  justifySelf: "end",
}

const style_borderedPartTwo: SxProps = {
  ...style_borderedBoardPart,
  gridColumn: { xs: "1/13", lg: "7/13", xl: "6/11", xxl: "6/10" },
  justifySelf: "start",
  overflow: "hidden",
}

const style_buttons: SxProps = {
  flexFlow: "row nowrap",
  justifyContent: "space-between",
  alignItems: "center",
}
