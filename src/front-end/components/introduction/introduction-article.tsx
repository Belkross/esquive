import { Stack, SxProps, Typography } from "@mui/material"
import shape from "../../theme/shape.js"

export type ArticleProps = {
  title: string
  description: string
}

export function IntroductionArticle({ title, description }: ArticleProps) {
  return (
    <Stack sx={style_container}>
      <Typography variant="h3">{title}</Typography>
      <Typography>{description}</Typography>
    </Stack>
  )
}

const style_container: SxProps = {
  backgroundColor: "background.paper",
  gap: 2,
  padding: shape.spacingBase,
  borderRadius: shape.borderRadius,
  
}
