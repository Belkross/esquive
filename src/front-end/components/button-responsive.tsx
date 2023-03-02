import { Button, IconButton, SxProps, useMediaQuery, useTheme } from "@mui/material"
import { ReactElement } from "react"
import { FlowlessFunction } from "../../types/main.js"

type Props = {
  icon: ReactElement
  label: string
  onClick: FlowlessFunction
  whileDisabled?: boolean
  sx?: SxProps
}

export function ButtonResponsive({ icon, label, onClick, whileDisabled, sx }: Props) {
  const screenIsLargeEnough = useMediaQuery(useTheme().breakpoints.up("md"))

  return screenIsLargeEnough ? (
    <Button startIcon={icon} onClick={onClick} disabled={whileDisabled} sx={{ ...sx }}>
      {label}
    </Button>
  ) : (
    <IconButton onClick={onClick} disabled={whileDisabled} aria-label={label} sx={{ ...sx }}>
      {icon}
    </IconButton>
  )
}
