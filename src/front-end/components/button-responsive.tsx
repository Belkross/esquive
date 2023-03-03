import { Button, IconButton, SxProps, useMediaQuery, useTheme } from "@mui/material"
import { ReactElement } from "react"
import { FlowlessFunction } from "../../types/main.js"

type Props = {
  icon: ReactElement
  label: string
  onClick: FlowlessFunction
  whileDisabled?: boolean
  sx?: SxProps
  selected?: boolean
}

export function ButtonResponsive({ icon, label, onClick, whileDisabled, sx, selected }: Props) {
  const screenIsLargeEnough = useMediaQuery(useTheme().breakpoints.up("md"))

  return screenIsLargeEnough ? (
    <Button
      startIcon={icon}
      onClick={onClick}
      disabled={whileDisabled}
      sx={{ backgroundColor: selected ? "primary.dark" : "primary.main", ...sx }}
    >
      {label}
    </Button>
  ) : (
    <IconButton onClick={onClick} disabled={whileDisabled} aria-label={label} sx={{ ...sx }}>
      {icon}
    </IconButton>
  )
}
