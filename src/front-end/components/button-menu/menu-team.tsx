import { SxProps } from "@mui/material"
import { AppState } from "../../../types/main.js"
import shape from "../../theme/shape.js"
import { ButtonShuffleTeams } from "../button-shuffle-teams.js"
import { Teams } from "../teams.js"
import { MenuElementContainer } from "./menu-element-container.js"

type Props = {
  appState: AppState
}
export function MenuTeam({ appState }: Props) {
  return (
    <MenuElementContainer sx={style_teams}>
      <Teams appState={appState} />
      <ButtonShuffleTeams appState={appState} />
    </MenuElementContainer>
  )
}

const style_teams: SxProps = {
  py: 4,
  height: "100%",
  paddingBottom: shape.appBarHeight,
  display: "flex",
  flexFlow: "column nowrap",
  justifyContent: "center",
  alignItems: "center",
  gap: 6,
}
