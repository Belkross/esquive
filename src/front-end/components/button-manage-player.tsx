import { Button, Menu, MenuItem, SxProps } from "@mui/material"
import { PlayerData } from "../../back-end/config/room-state/player-data.js"
import { useTemporaryElement } from "../custom-hooks/use-temporary-element.js"
import { useRef } from "react"
import { socket } from "../config/initialize-socket-io.js"

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

  const handleClick_kickPlayer = () => {
    menu.remove()
    socket.emit("kickPlayer", player.sessionId)
  }

  return (
    <>
      <Button sx={style_buttonPlayer(player)} onClick={menu.display} ref={anchorElement}>
        {player.isAdmin ? "*" + player.username : player.username}
      </Button>
      <Menu anchorEl={anchorElement.current} open={menu.displayed} onClose={menu.remove}>
        {!player.isAdmin && <MenuItem onClick={handleClick_promoteAdmin}>Faire devenir hôte</MenuItem>}
        <MenuItem onClick={handleClick_kickPlayer}>Expulser le joueur</MenuItem>
      </Menu>
    </>
  )
}

const style_buttonPlayer = (player: PlayerData): SxProps => {
  return {
    textDecorationLine: player.connected ? "none" : "line-through",
    padding: 0.5,
  }
}
