import { Button, Drawer } from "@mui/material"
import { socket } from "../config/initialize-socket-io.js"
import { useTemporaryElement } from "../custom-hooks/use-temporary-element.js"
import { ButtonResponsive } from "./button-responsive.js"
import MenuIcon from '@mui/icons-material/Menu';

const handleClick = () => socket.emit("leaveRoom")

export function ButtonMenu() {
  const drawer = useTemporaryElement(false)

  return (
    <>
      <ButtonResponsive icon={<MenuIcon/>} label="Menu" onClick={drawer.display}/>
      <Drawer variant="temporary" anchor="left" open={drawer.displayed} onClose={drawer.remove}>
        <Button onClick={handleClick}>Leave</Button>
      </Drawer>
    </>
  )
}
