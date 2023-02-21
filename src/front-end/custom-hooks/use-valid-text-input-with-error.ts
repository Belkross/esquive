import { ChangeEvent, useState } from "react"

type InputData = { value: string; validity: boolean; error: boolean }
type InputChanger = (event: ChangeEvent<HTMLInputElement>) => void
type ValidityChecker = (input: unknown) => boolean
type Output = {
  input: InputData
  onInputChange: InputChanger
  clearInput: () => void
}

export function useValidTextInputWithError(initialValue: string, validityChecker: ValidityChecker) {
  const [input, setInput] = useState({
    value: initialValue,
    validity: validityChecker(initialValue),
    error: deduceIfError(initialValue, validityChecker),
  })

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setInput({
      value,
      validity: validityChecker(value),
      error: deduceIfError(value, validityChecker),
    })
  }

  const clearInput = () => setInput({ value: "", validity: false, error: false })

  return { input, onInputChange, clearInput } as Output
}

function deduceIfError(inputValue: string, validityChecker: ValidityChecker) {
  const inputIsNotValid = !validityChecker(inputValue)
  const somethingIsWritten = inputValue.length > 0

  return inputIsNotValid && somethingIsWritten
}
