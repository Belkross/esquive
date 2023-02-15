import { Button, IconButton, useMediaQuery, useTheme } from "@mui/material"
import { ReactElement } from "react"
import { FlowlessFunction } from "../../types/main.js"

type Props = {
  icon: ReactElement
  label: string
  onClick: FlowlessFunction
  whileDisabled?: boolean
}

export function ButtonResponsive({ icon, label, onClick, whileDisabled }: Props) {
  const screenIsLargeEnough = useMediaQuery(useTheme().breakpoints.up("sm"))

  return screenIsLargeEnough ? (
    <Button startIcon={icon} onClick={onClick} disabled={whileDisabled}>
      {label}
    </Button>
  ) : (
    <IconButton onClick={onClick} disabled={whileDisabled} aria-label={label}>
      {icon}
    </IconButton>
  )
}
