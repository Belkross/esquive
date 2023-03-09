import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Stack, Typography } from "@mui/material";
import shape from "../../theme/shape.js";
export function Introduction() {
    return (_jsxs(Stack, { sx: style_container, children: [_jsx(Typography, { variant: "h2", mb: 2, children: "Principe de jeu" }), _jsx(Typography, { children: introduction.sentence1 }), _jsx(Typography, { children: introduction.sentence2 }), _jsx(Typography, { children: introduction.sentence3 })] }));
}
const introduction = {
    sentence1: "Esquive est un jeu de coopération où l’un des joueurs de votre équipe doit réussir à faire deviner un mot à ses coéquipiers dans un temps imparti.",
    sentence2: "Problème 1 : les adversaires ont piégé une liste de mots qui vous feront échouer si l’un d’eux est utilisé.",
    sentence3: "Problème 2 : La liste des mots piégés est gardée secrète !",
};
const style_container = {
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
};
