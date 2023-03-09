import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CssBaseline, GlobalStyles, ThemeProvider } from "@mui/material";
import { createCustomizedMuiTheme } from "../theme/create-customized-mui-theme.js";
import { useThemeMode } from "./provider-theme-mode/provider-theme-mode";
export function ProviderMuiTheming({ children }) {
    const themeMode = useThemeMode();
    return (_jsxs(ThemeProvider, { theme: createCustomizedMuiTheme(themeMode), children: [_jsx(CssBaseline, { enableColorScheme: true }), StaticGlobalStyles, children] }));
}
const StaticGlobalStyles = (_jsx(GlobalStyles, { styles: {
    /* body: {
  backgroundColor: "red"
} */
    } }));
