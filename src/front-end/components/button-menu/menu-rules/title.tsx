import { Typography } from "@mui/material"

type Props = {
  text: string
}

export function Title({ text }: Props) {
  return (
    <Typography variant="h2" sx={style_title}>
      {text}
    </Typography>
  )
}

const style_title = {
  color: "info.main",
}
