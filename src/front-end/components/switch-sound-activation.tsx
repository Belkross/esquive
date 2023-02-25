import { Switch, FormControlLabel } from "@mui/material"
import { useContext } from "react"
import { SoundActivationContext, ToggleSoundActivationContext } from "./provider-sound-activation.js"

export function SwitchSoundActivation() {
  const soundActivation = useContext(SoundActivationContext)
  const toggleSoundActivation = useContext(ToggleSoundActivationContext)

  const label = soundActivation ? "Volume ON" : "Volume OFF"

  const handleChange = () => toggleSoundActivation()

  const SwitchVolume = <Switch color="info" checked={soundActivation} onChange={handleChange} />

  return <FormControlLabel control={SwitchVolume} label={label} />
}
