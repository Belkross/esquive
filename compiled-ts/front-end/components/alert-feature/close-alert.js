export function closeAlert(setDisplay, reason) {
    if (reason === "clickaway")
        return;
    setDisplay(false);
}
