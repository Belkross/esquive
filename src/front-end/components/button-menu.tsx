import { Button, Drawer } from "@mui/material"
import { socket } from "../config/initialize-socket-io.js"
import { useTemporaryElement } from "../custom-hooks/use-temporary-element.js"

const handleClick = () => socket.emit("leaveRoom")

export function ButtonMenu() {
  const drawer = useTemporaryElement(false)

  return (
    <>
      <Button onClick={drawer.display}>Menu</Button>
      <Drawer variant="temporary" anchor="left" open={drawer.displayed} onClose={drawer.remove}>
        <Button onClick={handleClick}>Leave</Button>
      </Drawer>
    </>
  )
}
