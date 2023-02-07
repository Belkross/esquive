import { useState } from "react"

export type TemporaryElementState = {
  displayed: boolean
  display: () => void
  remove: () => void
}

export default function useTemporaryElement(initialState: boolean) {
  const [elementDisplay, setElementDisplay] = useState(initialState)

  const displayElement = () => setElementDisplay(true)
  const removeElement = () => setElementDisplay(false)

  return {
    displayed: elementDisplay,
    display: displayElement,
    remove: removeElement,
  }
}
