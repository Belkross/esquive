import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CircularProgress, Stack, Typography } from "@mui/material";
import { useSubscribeSocketIoConnection } from "./use-subscribe-socket-io-connection.js";
import { useSubscribeConnectError } from "./use-subscribe-connect-error.js";
export const FAKE_LOADING_DURATION = 500;
export function InterfaceConnectingServer({ setAppState }) {
    useSubscribeConnectError(setAppState);
    useSubscribeSocketIoConnection(setAppState);
    return (_jsxs(Stack, { sx: style_container, children: [_jsx(Typography, { variant: "h1", children: "Esquive" }), _jsx(CircularProgress, { sx: style_circularProgress }), _jsx(Typography, { children: "Chargement..." })] }));
}
const style_container = {
    alignItems: "center",
    gap: 4,
    marginTop: 3,
};
const style_circularProgress = {
    alignSelf: "center",
};
