import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { AlertFeature } from "./alert-feature/alert-feature.js";
import { ProviderMuiTheming } from "./provider-mui-theming.js";
import { ProviderSoundActivation } from "./provider-sound-activation.js";
import { ProviderThemeMode } from "./provider-theme-mode/provider-theme-mode.js";
export function GlobalFeatures({ children }) {
    return (_jsx(_Fragment, { children: _jsx(ProviderThemeMode, { children: _jsx(ProviderSoundActivation, { children: _jsx(ProviderMuiTheming, { children: _jsx(AlertFeature, { children: children }) }) }) }) }));
}
