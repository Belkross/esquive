import useTemporaryElement from "../custom-hooks/use-temporary-element.js"
import Drawer from "@mui/material/Drawer"
import Button from "@mui/material/Button"
import { socket } from "../config/initialize-socket-io.js"

const handleClick = () => socket.emit("leaveRoom")

export default function ButtonMenu() {
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
