import { useEffect } from "react"
import { FlowlessFunction } from "../../../types/main.js"

export function useAutoCloseWhenTimerEnd(
  roundPhase: string,
  closeModal: FlowlessFunction,
  clearInput: FlowlessFunction
) {
  useEffect(() => {
    const isPassivePhase =
      roundPhase === "pre round" || roundPhase === "pre guessing one" || roundPhase === "pre guessing two"
    if (isPassivePhase) {
      closeModal()
      clearInput()
    }
  }, [clearInput, closeModal, roundPhase])
}
