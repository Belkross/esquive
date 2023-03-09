import { Stack, SxProps, Typography } from "@mui/material"
import shape from "../../theme/shape.js"

export function Introduction() {
  return (
    <Stack sx={style_container}>
      <Typography variant="h2" mb={2}>Principe de jeu</Typography>
      <Typography>{introduction.sentence1}</Typography>
      <Typography>{introduction.sentence2}</Typography>
      <Typography>{introduction.sentence3}</Typography>
    </Stack>
  )
}

const introduction = {
  sentence1:
    "Esquive est un jeu de coopération où l’un des joueurs de votre équipe doit réussir à faire deviner un mot à ses coéquipiers dans un temps imparti.",
  sentence2:
    "Problème 1 : les adversaires ont piégé une liste de mots qui vous feront échouer si l’un d’eux est utilisé.",
  sentence3: "Problème 2 : La liste des mots piégés est gardée secrète !",
}

const style_container: SxProps = {
  gridRow: "3/11",
  gridColumn: "6/13",
  alignSelf: { lg: "start" },
  justifySelf: "start",

  backgroundColor: "background.paper",
  gap: 1,
  padding: shape.spacingBase,
  borderRadius: shape.borderRadius,
  width: "100%",
  maxWidth: { lg: "750px" },

  borderWidth: shape.borderWidth,
  borderStyle: shape.borderStyle,
  borderColor: "background.border",
}
