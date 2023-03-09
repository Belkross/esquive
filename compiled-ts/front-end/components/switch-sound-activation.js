import { jsx as _jsx } from "react/jsx-runtime";
import { Switch, FormControlLabel } from "@mui/material";
import { useContext } from "react";
import { SoundActivationContext, ToggleSoundActivationContext } from "./provider-sound-activation.js";
export function SwitchSoundActivation() {
    const soundActivation = useContext(SoundActivationContext);
    const toggleSoundActivation = useContext(ToggleSoundActivationContext);
    const label = soundActivation ? "Volume ON" : "Volume OFF";
    const handleChange = () => toggleSoundActivation();
    const SwitchVolume = _jsx(Switch, { color: "info", checked: soundActivation, onChange: handleChange });
    return _jsx(FormControlLabel, { control: SwitchVolume, label: label });
}
