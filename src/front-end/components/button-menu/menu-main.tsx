import { AppState } from "../../../types/types.js"
import { ButtonLeaveRoom } from "../button-leave-room.js"
import { SwitchSoundActivation } from "../switch-sound-activation.js"
import { SxProps, Stack } from "@mui/material"
import { LinkDiscord } from "../link-discord.js"
import shape from "../../theme/shape.js"
import { TitleMenu } from "./title-menu.js"
import { ScrollableContainer } from "./scrollable-container.js"
import { RoomManager } from "../room-manager.js"
import { SwitchRoomAccess } from "../switch-room-access.js"

type Props = {
  appState: AppState
}

export function MenuMain({ appState }: Props) {
  return (
    <>
      <TitleMenu>Menu principal</TitleMenu>

      <ScrollableContainer>
        <Stack sx={style_menuElement}>
          <LinkDiscord />
        </Stack>

        <Stack sx={style_menuElement}>
          <SwitchSoundActivation />
        </Stack>

        <Stack sx={style_menuElement}>
          <SwitchRoomAccess appState={appState} />
        </Stack>

        <Stack sx={style_room}>
          <RoomManager appState={appState} />
        </Stack>

        <ButtonLeaveRoom />
      </ScrollableContainer>
    </>
  )
}

const style_menuElement: SxProps = {
  flexFlow: "row nowrap",
  width: "100%",
  maxWidth: "500px",
  backgroundColor: "background.paper",
  padding: 2,
  borderRadius: shape.borderRadius,
  alignItems: "center",
  gap: 2,
}

const style_room: SxProps = {
  ...style_menuElement,
  flexFlow: "column nowrap",
  gap: 1,
  py: 5,
}
