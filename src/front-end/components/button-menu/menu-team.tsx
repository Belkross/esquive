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
    <>
      <MenuElementContainer sx={style_teams}>
        <Teams appState={appState} />
      </MenuElementContainer>

      <MenuElementContainer sx={style_buttonShuffle}>
        <ButtonShuffleTeams appState={appState} />
      </MenuElementContainer>
    </>
  )
}

const style_teams: SxProps = {
  py: 4,
}

const style_buttonShuffle: SxProps = {
  height: "100%",
  textAlign: "center",
  paddingTop: 4,
  paddingBottom: shape.appBarHeight,
}
