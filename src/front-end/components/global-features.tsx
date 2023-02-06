import { ReactElement } from "react"
import ProviderMuiTheming from "./provider-mui-theming"
import ProviderThemeMode from "./provider-theme-mode/provider-theme-mode"

type Props = {
  children: ReactElement
}

export default function GlobalFeatures({ children }: Props) {
  return (
    <>
      <ProviderThemeMode>
        <ProviderMuiTheming>{children}</ProviderMuiTheming>
      </ProviderThemeMode>
    </>
  )
}
