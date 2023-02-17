import ThumbUpIcon from "@mui/icons-material/ThumbUp"
import ThumbDownIcon from "@mui/icons-material/ThumbDown"
import { Tooltip, Badge, IconButton } from "@mui/material"
import { doNothing } from "../../functions/do-nothing.js"

type Props = {
  isThumbUp: boolean
  clientVote: boolean | undefined
  votersUsername: string[]
}

export function ButtonThumb({ isThumbUp, clientVote, votersUsername }: Props) {
  const votersUsernameString = votersUsername.join(", ")
  const badgeColor = isThumbUp ? "success" : "error"
  const icon = isThumbUp ? <ThumbUpIcon /> : <ThumbDownIcon />

  return (
    <Tooltip title={votersUsernameString}>
      <Badge color={badgeColor} badgeContent={votersUsername.length}>
        <IconButton sx={style_button(isThumbUp, clientVote)} onClick={doNothing}>
          {icon}
        </IconButton>
      </Badge>
    </Tooltip>
  )
}

const style_button = (buttonVoteType: boolean, clientVote: boolean | undefined) => {
  const buttonType = buttonVoteType ? "thumbUp" : "thumbDown"
  const buttonMainColor = buttonType === "thumbUp" ? "success.main" : "error.main"

  const getIconColor = () => {
    const buttonIsPressed =
      (clientVote === true && buttonType === "thumbUp") || (clientVote === false && buttonType === "thumbDown")
    return buttonIsPressed ? buttonMainColor : "gray"
  }

  return {
    width: "30px",
    height: "30px",
    borderColor: buttonMainColor,
    color: getIconColor(),
    backgroundColor: "background.paper",
  }
}
