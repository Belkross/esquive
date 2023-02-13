import EditIcon from "@mui/icons-material/Edit"
import { Stack, IconButton, Typography } from "@mui/material"
import { Dispatch, SetStateAction } from "react"
import { AppState } from "../../../types/types"
import { useTemporaryElement } from "../../custom-hooks/use-temporary-element.js"
import { ModalChangeUsername } from "./modal-change-username.js"

type Props = {
  appState: AppState
  setAppState: Dispatch<SetStateAction<AppState>>
}

export function ButtonChangeUsername({ appState, setAppState }: Props) {
  const modal = useTemporaryElement(false)

  return (
    <>
      <Stack sx={style_container}>
        <IconButton aria-label="pseudonyme" onClick={modal.display}>
          <EditIcon />
        </IconButton>
        <Typography>Pseudo : {appState.username}</Typography>
      </Stack>

      <ModalChangeUsername displayed={modal.displayed} close={modal.remove} setAppState={setAppState} />
    </>
  )
}

const style_container = {
  flexDirection: "row",
  gap: 1,
  alignItems: "center",
}
