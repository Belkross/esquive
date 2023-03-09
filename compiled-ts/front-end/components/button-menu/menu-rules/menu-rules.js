import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Typography } from "@mui/material";
import { ScrollableContainer } from "../scrollable-container.js";
import { TitleMenu } from "../title-menu.js";
import { ArticleList } from "./article-list.js";
import rules from "./rules.js";
import { Title } from "./title.js";
export function MenuRules() {
    return (_jsxs(_Fragment, { children: [_jsx(TitleMenu, { children: "R\u00E8gles du jeu" }), _jsxs(ScrollableContainer, { children: [_jsx(Title, { text: rules.gameDescription.title.toUpperCase() }), _jsx(Typography, { children: rules.gameDescription.description }), _jsx(Title, { text: rules.trapperCode.title.toUpperCase() }), _jsx(ArticleList, { articles: rules.trapperCode.articles }), _jsx(Title, { text: rules.guesserCode.title.toUpperCase() }), _jsx(ArticleList, { articles: rules.guesserCode.articles }), _jsx(Title, { text: rules.talkerCode.title.toUpperCase() }), _jsx(Typography, { children: rules.talkerCode.introduction }), _jsx(ArticleList, { articles: rules.talkerCode.articles })] })] }));
}
