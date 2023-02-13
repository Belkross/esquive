import { SnackbarCloseReason } from "@mui/material";
import { Dispatch, SetStateAction } from "react";

export function closeAlert(setDisplay: Dispatch<SetStateAction<boolean>>, reason?: SnackbarCloseReason) {
  if (reason === "clickaway") return
  setDisplay(false)
}