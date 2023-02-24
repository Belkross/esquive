import { Button, Menu, MenuItem, SxProps } from "@mui/material"
import { PlayerData } from "../../back-end/config/room-state/player-data.js"
import AdminIcon from "@mui/icons-material/MilitaryTech"
import { useTemporaryElement } from "../custom-hooks/use-temporary-element.js"
import { useRef } from "react"
import { socket } from "../config/initialize-socket-io.js"
import { doNothing } from "../../functions/do-nothing.js"

type Props = {
  player: PlayerData
}
export function ButtonManagePlayer({ player }: Props) {
  const menu = useTemporaryElement(false)
  const anchorElement = useRef<HTMLButtonElement>(null)

  const handleClick_promoteAdmin = () => {
    menu.remove()
    socket.emit("promoteAdmin", player.sessionId)
  }

  return (
    <>
      <Button sx={style_buttonPlayer(player)} startIcon={player.isAdmin ? <AdminIcon /> : null} onClick={menu.display} ref={anchorElement}>
        {player.username}
      </Button>
      <Menu anchorEl={anchorElement.current} open={menu.displayed} onClose={menu.remove}>
        {!player.isAdmin && <MenuItem onClick={handleClick_promoteAdmin} sx={style_menuItem}>Faire devenir hôte</MenuItem>}
        <MenuItem onClick={doNothing} sx={style_menuItem}>Expulser le joueur</MenuItem>
      </Menu>
    </>
  )
}

const style_buttonPlayer = (player: PlayerData): SxProps => {
  const color = player.isAdmin ? "admin.main" : "primary.main"

  return {
    textDecorationLine: player.connected ? "none" : "line-through",
    padding: 0.5,

    backgroundColor: color,
    borderColor: color,
  }
}

const style_menuItem: SxProps = {
  //
}
