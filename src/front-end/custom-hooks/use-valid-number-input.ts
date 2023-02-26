import { ChangeEvent, useState } from "react"

type InputData = { value: string; validity: boolean }
type InputChanger = (event: ChangeEvent<HTMLInputElement>) => void

export function useValidNumberInput(initialValue: number, validityChecker: (input: unknown) => boolean) {
  const [input, setInput] = useState({ value: initialValue.toString(), validity: validityChecker(initialValue) })

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value

    setInput({
      value,
      validity: validityChecker(Number.parseInt(value, 10)),
    })
  }

  return [input, onInputChange] as [InputData, InputChanger]
}
