import { jsx as _jsx } from "react/jsx-runtime";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { Tooltip, Badge, IconButton } from "@mui/material";
export function ButtonThumb({ isThumbUp, clientVote, votersUsername, small, handleClick }) {
    const votersUsernameString = votersUsername.join(", ");
    const badgeColor = isThumbUp ? "success" : "error";
    const icon = isThumbUp ? _jsx(ThumbUpIcon, {}) : _jsx(ThumbDownIcon, {});
    return (_jsx(Tooltip, { title: votersUsernameString, children: _jsx(Badge, { color: badgeColor, badgeContent: votersUsername.length, children: _jsx(IconButton, { sx: style_button(isThumbUp, clientVote, small), onClick: () => handleClick(isThumbUp), children: icon }) }) }));
}
const style_button = (buttonVoteType, clientVote, small) => {
    const buttonType = buttonVoteType ? "thumbUp" : "thumbDown";
    const buttonMainColor = buttonType === "thumbUp" ? "success.main" : "error.main";
    const size = small ? "30px" : "inherit";
    const getIconColor = () => {
        const buttonIsPressed = (clientVote === true && buttonType === "thumbUp") || (clientVote === false && buttonType === "thumbDown");
        return buttonIsPressed ? buttonMainColor : "gray";
    };
    return {
        width: size,
        height: size,
        borderColor: buttonMainColor,
        color: getIconColor(),
        backgroundColor: "background.paper",
    };
};
