import { ReactElement } from "react"
import AlertFeature from "./alert-feature/alert-feature"
import ProviderMuiTheming from "./provider-mui-theming"
import ProviderThemeMode from "./provider-theme-mode/provider-theme-mode"

type Props = {
  children: ReactElement
}

export default function GlobalFeatures({ children }: Props) {
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
