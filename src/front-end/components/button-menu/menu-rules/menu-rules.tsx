import { SxProps, Typography } from "@mui/material"
import shape from "../../../theme/shape.js"
import { MenuElementContainer } from "../menu-element-container.js"
import { ArticleList } from "./article-list.js"
import rules from "./rules.js"
import { Title } from "./title.js"

export function MenuRules() {
  return (
    <MenuElementContainer sx={style_container}>
      <Title text={rules.gameDescription.title.toUpperCase()} />
      <Typography>{rules.gameDescription.description}</Typography>

      <Title text={rules.trapperCode.title.toUpperCase()} />
      <ArticleList articles={rules.trapperCode.articles} />

      <Title text={rules.guesserCode.title.toUpperCase()} />
      <ArticleList articles={rules.guesserCode.articles} />

      <Title text={rules.talkerCode.title.toUpperCase()} />
      <Typography>{rules.talkerCode.introduction}</Typography>
      <ArticleList articles={rules.talkerCode.articles} />
    </MenuElementContainer>
  )
}

const style_container: SxProps = {
  display: "flex",
  flexFlow: "column nowrap",
  gap: 2,
  paddingBottom: shape.appBarHeight,
  backgroundColor: "background.default",
}
