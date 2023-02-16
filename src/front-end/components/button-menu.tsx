import { Button, Drawer } from "@mui/material"
import { socket } from "../config/initialize-socket-io.js"
import { useTemporaryElement } from "../custom-hooks/use-temporary-element.js"
import { ButtonResponsive } from "./button-responsive.js"
import MenuIcon from "@mui/icons-material/Menu"
import { InterfaceGameProps } from "./interface-game.js"
import { doNothing } from "../../functions/do-nothing.js"

export function ButtonMenu({ appState, setAppState }: InterfaceGameProps) {
  doNothing(appState)
  const drawer = useTemporaryElement(false)

  const handleClick = () => {
    socket.disconnect()
    setAppState((prevAppState) => ({ ...prevAppState, status: "logging", room: "" }))
  }

  return (
    <>
      <ButtonResponsive icon={<MenuIcon />} label="Menu" onClick={drawer.display} />
      <Drawer variant="temporary" anchor="left" open={drawer.displayed} onClose={drawer.remove}>
        <Button onClick={handleClick}>Leave</Button>
      </Drawer>
    </>
  )
}
