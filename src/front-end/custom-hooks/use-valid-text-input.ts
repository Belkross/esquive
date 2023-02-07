import { ChangeEvent, useState } from "react"

type InputData = { value: string; validity: boolean }
type InputChanger = (event: ChangeEvent<HTMLInputElement>) => void

export default function useValidTextInput(initialValue: string, validityChecker: (input: string) => boolean) {
  const [input, setInput] = useState({ value: initialValue, validity: validityChecker(initialValue) })

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value

    setInput({
      value,
      validity: validityChecker(value),
    })
  }

  return [input, onInputChange] as [InputData, InputChanger]
}
