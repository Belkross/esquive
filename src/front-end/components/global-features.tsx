import { ReactElement } from "react"
import ProviderMuiTheming from "./provider-mui-theming"

type Props = {
  children: ReactElement
}

export default function GlobalFeatures({ children }: Props) {
  return <ProviderMuiTheming>{children}</ProviderMuiTheming>
}
