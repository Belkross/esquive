import { ChangeEvent, useState } from "react"

type InputData = { value: string; validity: boolean }
type InputChanger = (event: ChangeEvent<HTMLInputElement>) => void

//prettier-ignore
export function useValidNumberInput(initialValue: number, validityChecker: (input: unknown) => boolean): [InputData, InputChanger] {
  const [input, setInput] = useState({ value: initialValue.toString(), validity: validityChecker(initialValue) })

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value

    setInput({
      value,
      validity: validityChecker(Number.parseInt(value, 10)),
    })
  }

  return [input, onInputChange]
}
