import { useEffect } from "react"
import { FlowlessFunction } from "../../../types/types.js"

export function useModalShortCut(whileModalAllowed: boolean, displayed: boolean, display: FlowlessFunction) {
  useEffect(() => {
    const keyDownHandler = (event: KeyboardEvent) => {
      if (whileModalAllowed && !displayed && event.shiftKey && event.key === "Enter") display()
    }

    document.addEventListener("keydown", keyDownHandler)

    return () => document.removeEventListener("keydown", keyDownHandler)
  }, [displayed, display, whileModalAllowed])
}
