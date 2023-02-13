import { ReactElement } from "react"
import { AlertFeature } from "./alert-feature/alert-feature.js"
import { ProviderMuiTheming } from "./provider-mui-theming.js"
import { ProviderThemeMode } from "./provider-theme-mode/provider-theme-mode.js"

type Props = {
  children: ReactElement
}

export function GlobalFeatures({ children }: Props) {
  return (
    <>
      <ProviderThemeMode>
        <ProviderMuiTheming>
          <AlertFeature>{children}</AlertFeature>
        </ProviderMuiTheming>
      </ProviderThemeMode>
    </>
  )
}
