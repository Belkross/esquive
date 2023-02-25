import { ReactElement } from "react"
import { AlertFeature } from "./alert-feature/alert-feature.js"
import { ProviderMuiTheming } from "./provider-mui-theming.js"
import { ProviderSoundActivation } from "./provider-sound-activation.js"
import { ProviderThemeMode } from "./provider-theme-mode/provider-theme-mode.js"

type Props = {
  children: ReactElement
}

export function GlobalFeatures({ children }: Props) {
  return (
    <>
      <ProviderThemeMode>
        <ProviderSoundActivation>
          <ProviderMuiTheming>
            <AlertFeature>{children}</AlertFeature>
          </ProviderMuiTheming>
        </ProviderSoundActivation>
      </ProviderThemeMode>
    </>
  )
}
