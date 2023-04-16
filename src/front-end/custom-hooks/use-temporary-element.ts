import { useCallback, useState } from "react"

export type TemporaryElementState = {
  displayed: boolean
  display: () => void
  remove: () => void
}

export function useTemporaryElement(initialState: boolean): TemporaryElementState {
  const [elementDisplay, setElementDisplay] = useState(initialState)

  const displayElement = useCallback(() => setElementDisplay(true), [])
  const removeElement = useCallback(() => setElementDisplay(false), [])

  return {
    displayed: elementDisplay,
    display: displayElement,
    remove: removeElement,
  }
}
