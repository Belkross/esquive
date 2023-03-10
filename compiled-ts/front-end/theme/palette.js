import { grey, indigo, orange, red } from "@mui/material/colors";
const smoothWhiteText = "rgba(255, 255, 255, .85)";
const smoothBlackText = "rgba(0, 0, 0, .85)";
const darkModePalette = {
    primary: { main: "#1056A5" },
    team: { one: indigo[400], two: red[400] },
    warning: { main: orange[600] },
    text: {
        primary: smoothWhiteText,
        opposite: smoothBlackText,
        rule: orange[400],
    },
    background: {
        default: "#0a1929",
        paper: "#0c2744",
        border: "#244d77",
        navBar: "#001e3c",
        historic: grey[900],
    },
};
const lightModePalette = {
    ...darkModePalette,
    text: {
        primary: smoothBlackText,
        opposite: smoothWhiteText,
        rule: red[900],
    },
};
export default {
    dark: darkModePalette,
    light: lightModePalette,
};