import { Box, Typography } from "@mui/material"

type Article = {
  title: string
  description: string
}

type Props = {
  articles: Article[]
}

export function ArticleList({ articles }: Props) {
  const articleList = articles.map((article, index) => {
    const articleId = index + 1
    const articleTitleString = `Article ${articleId} - ${article.title}`

    return (
      <Box key={index}>
        <Typography sx={style_title}>{articleTitleString}</Typography>
        <Typography>{article.description}</Typography>
      </Box>
    )
  })

  return <>{articleList}</>
}

const style_title = { color: "text.rule" }
