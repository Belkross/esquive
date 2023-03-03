import { IconButton, SxProps } from "@mui/material"
import { FlowlessFunction } from "../../types/main.js"
import CloseIcon from "@mui/icons-material/Clear"

type Props = {
  onClick: FlowlessFunction
  sx?: SxProps
}

export default function ButtonCloseElement({ onClick, sx }: Props) {
  const style = { ...style_buttonClose, ...sx }

  return (
    <IconButton aria-label="Fermer" onClick={onClick} sx={style}>
      <CloseIcon />
    </IconButton>
  )
}

const style_buttonClose: SxProps = {
  backgroundColor: "error.main",
  borderColor: "error.main",
}
