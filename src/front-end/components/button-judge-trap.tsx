import ValidateIcon from "@mui/icons-material/Done"
import RefuseIcon from "@mui/icons-material/Close"
import { IconButton } from "@mui/material"

export default function ButtonsJudgeTrap() {
  //const whileDisabled = useGetWhileDisabled()

  //const handleClick = (judgement) => () => socket.emit("judgeTrap", judgement)

  return (
    <>
      <IconButton sx={style_buttonValidate} disabled={true} /* onClick={handleClick(true)} */>
        <ValidateIcon />
      </IconButton>
      <IconButton sx={style_buttonRefuse} disabled={true} /* onClick={handleClick(false)} */>
        <RefuseIcon />
      </IconButton>
    </>
  )
}

const style_buttonValidate = {
  backgroundColor: "success.main",
  borderColor: "success.main",
}

const style_buttonRefuse = {
  backgroundColor: "error.main",
  borderColor: "error.main",
}
