import { Typography } from "@mui/material"
import { ArticleList } from "./article-list.js"
import rules from "./rules.js"
import { Title } from "./title.js"

export function MenuRules() {
  return (
    <>
      <Title text={rules.gameDescription.title.toUpperCase()} />
      <Typography>{rules.gameDescription.description}</Typography>

      <Title text={rules.trapperCode.title.toUpperCase()} />
      <ArticleList articles={rules.trapperCode.articles} />

      <Title text={rules.guesserCode.title.toUpperCase()} />
      <ArticleList articles={rules.guesserCode.articles} />

      <Title text={rules.talkerCode.title.toUpperCase()} />
      <Typography>{rules.talkerCode.introduction}</Typography>
      <ArticleList articles={rules.talkerCode.articles} />
    </>
  )
}
