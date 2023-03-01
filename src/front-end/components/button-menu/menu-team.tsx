import { AppState } from "../../../types/main.js"
import { ButtonShuffleTeams } from "../button-shuffle-teams.js"
import { Teams } from "../teams.js"
import { ScrollableContainer } from "./scrollable-container.js"
import { TitleMenu } from "./title-menu.js"

type Props = {
  appState: AppState
}
export function MenuTeam({ appState }: Props) {
  return (
    <>
      <TitleMenu>Équipes et rôles</TitleMenu>

      <ScrollableContainer>
        <Teams appState={appState} />
        <ButtonShuffleTeams appState={appState} />
      </ScrollableContainer>
    </>
  )
}
