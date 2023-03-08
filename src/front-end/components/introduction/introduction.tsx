import { Stack, SxProps, Typography } from "@mui/material"
import shape from "../../theme/shape.js"
import { ArticleProps, IntroductionArticle } from "./introduction-article.js"

export default function Introduction() {
  return (
    <>
      <Stack sx={style_introduction}>
        <Typography>{introduction.sentence1}</Typography>
        <Typography>{introduction.sentence2}</Typography>
        <Typography>{introduction.sentence3}</Typography>
      </Stack>

      <Stack sx={style_articles}>
        <IntroductionArticle title={content.article1.title} description={content.article1.description} />
        <IntroductionArticle title={content.article2.title} description={content.article2.description} />
        <IntroductionArticle title={content.article3.title} description={content.article3.description} />
      </Stack>
    </>
  )
}

const introduction = {
  sentence1:
    "Esquive est un jeu de coopération où l’un des joueurs de votre équipe doit réussir à faire deviner un mot à ses coéquipiers dans un temps imparti.",
  sentence2: "Problème 1 : les adversaires ont piégé une liste de mots qui vous feront échouer si ils sont utilisés.",
  sentence3: "Problème 2 : Cette liste de mots piégés est secrète !",
}

const content: { [article: string]: ArticleProps } = {
  article1: {
    title: "4 à 10 joueurs",
    description: "Il suffit de partager le nom du salon pour commencer à jouer.",
  },
  article2: {
    title: "Chat disponible",
    description: "Le jeu est d’abord pensé pour être joué à l’oral, mais se joue aussi confortablement à l’écrit.",
  },
  article3: {
    title: "Communauté",
    description: "Si tu cherches d’autres joueurs, tu peux rejoindre le Discord de la communauté.",
  },
}

const style_introduction: SxProps = {
  backgroundColor: "background.paper",
  gap: 2,
  padding: shape.spacingBase,
  borderRadius: shape.borderRadius,
  width: "100%",
}

const style_articles: SxProps = {
  flexDirection: { xs: "column", md: "row" },
  justifyContent: "stretch",
  gap: shape.spacingBase,
  width: "100%",
}
