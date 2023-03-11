import { Box, Stack, SxProps, useMediaQuery, useTheme } from "@mui/material"
import { Dispatch, SetStateAction } from "react"
import { AppState } from "../../../types/main.js"
import { useTemporaryElement } from "../../custom-hooks/use-temporary-element.js"
import shape from "../../theme/shape.js"
import { ApplicationBar } from "../application-bar.js"
import { ButtonsJudgeTrap } from "../button-judge-trap.js"
import { ButtonPlayNextPhase } from "../button-play-next-phase.js"
import { ButtonReportForbiddenClue } from "../button-report-forbidden-clue.js"
import { ButtonSubmitWord } from "../button-submit-word/button-submit-word.js"
import { ModalSubmitWord } from "../button-submit-word/modal-submit-word.js"
import { useModalShortCut } from "../button-submit-word/use-modal-shortcut.js"
import { ChangeSecretWord } from "../change-secret-word.js"
import { GameHistoric } from "../game-historic/game-historic.js"
import { Instructions } from "../instructions.js"
import { Score } from "../score/score.js"
import { Teams } from "../teams.js"
import { TrapsRemaining } from "../traps-remaining.js"
import { Traps } from "../traps/traps.js"
import { getWhileModalAllowed } from "./get-while-modal-allowed.js"
import { useSubscribeRoomStateUpdate } from "./use-subscribe-room-state-update.js"

export type InterfaceGameProps = {
  appState: AppState
  setAppState: Dispatch<SetStateAction<AppState>>
}

export function InterfaceGame({ appState, setAppState }: InterfaceGameProps) {
  const { displayed, display, remove } = useTemporaryElement(false)
  const breakpoint_xl = useMediaQuery(useTheme().breakpoints.up("xl"))
  const whileAppBarTop = useMediaQuery(useTheme().breakpoints.up("lg"))
  const whileModalAllowed = getWhileModalAllowed(appState)

  useSubscribeRoomStateUpdate(setAppState)
  useModalShortCut(whileModalAllowed, displayed, display)

  return (
    <>
      <ApplicationBar appState={appState} openSubmitWordModal={display} />
      <Box sx={style_board}>
        <Score appState={appState} />

        <Stack sx={style_borderedPartOne}>
          <Stack sx={style_buttons}>
            {whileAppBarTop && <ButtonSubmitWord appState={appState} openModal={display} />}
            <ButtonPlayNextPhase appState={appState} />
          </Stack>
          <Instructions appState={appState} />
          <GameHistoric appState={appState} />
          <ButtonsJudgeTrap appState={appState} />
        </Stack>

        <Stack sx={style_borderedPartTwo}>
          <ChangeSecretWord appState={appState} />
          <ButtonReportForbiddenClue appState={appState} />
          <TrapsRemaining appState={appState} />
          <Traps appState={appState} />
        </Stack>

        {breakpoint_xl && <Teams appState={appState} />}
      </Box>

      <ModalSubmitWord appState={appState} displayed={displayed} close={remove} />
    </>
  )
}

const style_board: SxProps = {
  display: { xs: "flex", lg: "grid" },
  flexFlow: "column nowrap",
  gap: { xs: 3, sm: 4, lg: "none" },

  gridTemplateColumns: "repeat(12, 1fr)",
  gridTemplateRows: "repeat(12, 1fr)",
  alignItems: { xs: "center", lg: "start" },
  rowGap: 3,
  columnGap: 4,
  justifyItems: "center",

  maxWidth: shape.appMaxWidth,
  maxHeight: { xs: "none", lg: "950px" },

  margin: "auto",
  px: shape.spacingBase,
  paddingBottom: { xs: `${shape.appBarHeight + 50}px`, lg: 8 },
  paddingTop: { xs: 3, lg: `${shape.appBarHeight + 35}px` },
}

const style_borderedBoardPart: SxProps = {
  maxWidth: "500px",
  width: "100%",

  gridRow: "2/11",
  alignSelf: { xs: "center", lg: "start" },

  padding: shape.spacingBase,
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

  gridColumn: { lg: "1/7", xl: "1/6" },
  justifySelf: "end",
  minHeight: { xs: "450px", lg: shape.trapSectionMaxHeight },
  maxHeight: { xs: "500px", lg: shape.trapSectionMaxHeight },
}

const style_borderedPartTwo: SxProps = {
  ...style_borderedBoardPart,
  gridColumn: { lg: "7/13", xl: "6/10" },
  minHeight: { xs: "200px", lg: shape.trapSectionMaxHeight },
  maxHeight: shape.trapSectionMaxHeight,
  overflow: "hidden",
}

const style_buttons: SxProps = {
  flexFlow: "row nowrap",
  justifyContent: { xs: "center", lg: "space-between" },
  alignItems: "center",
}
