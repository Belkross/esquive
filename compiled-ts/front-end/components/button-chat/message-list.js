import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Typography, ListItem, ListItemText } from "@mui/material";
export default function MessageList({ messages }) {
    const list_message = messages.map((message, index) => {
        const chatEntrie = (_jsxs(_Fragment, { children: [_jsx(Typography, { component: "span", sx: style_authorTypo, children: `${message.author}` }), _jsx(Typography, { component: "span", children: `:\u00A0${message.content}` })] }));
        return (_jsx(ListItem, { sx: style_container, children: _jsx(ListItemText, { primary: chatEntrie }) }, index));
    });
    return _jsx(_Fragment, { children: list_message });
}
const style_authorTypo = {
    color: "orange",
};
const style_container = {
    px: 0,
    py: 0,
};
