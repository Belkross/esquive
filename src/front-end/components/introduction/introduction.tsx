import { Stack, SxProps, Typography } from "@mui/material"
import shape from "../../theme/shape.js"
import { LinkDiscord } from "../link-discord.js"

export function Introduction() {
  return (
    <Stack sx={style_container}>
      <Stack sx={style_description}>
        <Typography variant="h2" mb={2}>
          Principe de jeu
        </Typography>
        <Typography>{introduction.sentence1}</Typography>
        <Typography>
          <Typography component="span" sx={style_enhancedText}>
            Problème 1
          </Typography>
          {introduction.sentence2}
        </Typography>
        <Typography>
          <Typography component="span" sx={style_enhancedText}>
            Problème 2
          </Typography>
          {introduction.sentence3}
        </Typography>
      </Stack>
      <LinkDiscord />
    </Stack>
  )
}

const introduction = {
  sentence1:
    "Esquive est un jeu de coopération où l’un des joueurs de votre équipe doit réussir à faire deviner un mot à ses coéquipiers dans un temps imparti.",
  sentence2: " : les adversaires ont piégé une liste de mots qui vous feront échouer si l’un d’eux est utilisé.",
  sentence3: " : La liste des mots piégés est gardée secrète\u00A0!",
}

const style_container: SxProps = {
  justifyContent: "space-between",

  gridRow: "3/11",
  gridColumn: "7/13",
  alignSelf: { lg: "start" },
  justifySelf: "start",

  backgroundColor: "background.paper",
  gap: 1,
  padding: shape.spacingBase,
  borderRadius: shape.borderRadius,
  width: "100%",
  maxWidth: { lg: "450px" },
  height: { lg: "100%" },

  borderWidth: shape.borderWidth,
  borderStyle: shape.borderStyle,
  borderColor: "background.border",
}

const style_description: SxProps = {
  gap: 1,
  marginBottom: 4,
}

const style_enhancedText: SxProps = {
  color: "warning.main",
}
