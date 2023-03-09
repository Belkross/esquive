import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useState } from "react";
import { doNothing } from "../../functions/do-nothing.js";
export const SoundActivationContext = createContext(true);
export const ToggleSoundActivationContext = createContext(doNothing);
export function ProviderSoundActivation({ children }) {
    const [soundActivation, setSoundActivation] = useState(true);
    const toggleSoundActivation = () => setSoundActivation((prevState) => !prevState);
    return (_jsx(SoundActivationContext.Provider, { value: soundActivation, children: _jsx(ToggleSoundActivationContext.Provider, { value: toggleSoundActivation, children: children }) }));
}
