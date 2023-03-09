import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Box, Typography } from "@mui/material";
export function ArticleList({ articles }) {
    const articleList = articles.map((article, index) => {
        const articleId = index + 1;
        const articleTitleString = `Article ${articleId} - ${article.title}`;
        return (_jsxs(Box, { sx: style_container, children: [_jsx(Typography, { sx: style_title, children: articleTitleString }), _jsx(Typography, { children: article.description })] }, index));
    });
    return _jsx(_Fragment, { children: articleList });
}
const style_container = {
    alignSelf: "start",
};
const style_title = { color: "text.rule" };
