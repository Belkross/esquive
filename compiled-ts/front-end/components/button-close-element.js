import { jsx as _jsx } from "react/jsx-runtime";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Clear";
export default function ButtonCloseElement({ onClick, sx }) {
    const style = { ...style_buttonClose, ...sx };
    return (_jsx(IconButton, { "aria-label": "Fermer", onClick: onClick, sx: style, children: _jsx(CloseIcon, {}) }));
}
const style_buttonClose = {
    backgroundColor: "error.dark",
    borderColor: "error.dark",
};
