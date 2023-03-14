import { Breakpoint, Button, IconButton, SxProps, Tooltip, useMediaQuery, useTheme } from "@mui/material"
import { ReactElement } from "react"
import { FlowlessFunction } from "../../types/main.js"

type Props = {
  icon: ReactElement
  label: string
  onClick: FlowlessFunction
  whileDisabled?: boolean
  sx?: SxProps
  selected?: boolean
  breakpoint?: Breakpoint
  tooltip?: string
}

export function ButtonResponsive({ icon, label, onClick, whileDisabled, sx, selected, breakpoint, tooltip }: Props) {
  const screenIsLargeEnough = useMediaQuery(useTheme().breakpoints.up(breakpoint || "md"))
  const backgroundColor = selected ? "background.navBar" : "primary.main"

  return screenIsLargeEnough ? (
    <Tooltip title={tooltip} disableFocusListener arrow>
      <Button startIcon={icon} onClick={onClick} disabled={whileDisabled} sx={{ backgroundColor, ...sx }}>
        {label}
      </Button>
    </Tooltip>
  ) : (
    <Tooltip title={tooltip}>
      <IconButton onClick={onClick} disabled={whileDisabled} aria-label={label} sx={{ backgroundColor, ...sx }}>
        {icon}
      </IconButton>
    </Tooltip>
  )
}
