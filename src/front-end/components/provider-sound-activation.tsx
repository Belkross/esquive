import { createContext, ReactElement, useState } from "react"
import { doNothing } from "../../functions/do-nothing.js"

export const SoundActivationContext = createContext(true)
export const ToggleSoundActivationContext = createContext(doNothing)

type Props = {
  children: ReactElement
}

export function ProviderSoundActivation({ children }: Props) {
  const [soundActivation, setSoundActivation] = useState(true)

  const toggleSoundActivation = () => setSoundActivation((prevState) => !prevState)

  return (
    <SoundActivationContext.Provider value={soundActivation}>
      <ToggleSoundActivationContext.Provider value={toggleSoundActivation}>
        {children}
      </ToggleSoundActivationContext.Provider>
    </SoundActivationContext.Provider>
  )
}
