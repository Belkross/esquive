import ThumbUpIcon from "@mui/icons-material/ThumbUp"
import ThumbDownIcon from "@mui/icons-material/ThumbDown"
import { Tooltip, Badge, IconButton } from "@mui/material"

type Props = {
  isThumbUp: boolean
  clientVote: boolean | undefined
  votersUsername: string[]
  small?: boolean
  handleClick: (vote: boolean) => void
}

export function ButtonThumb({ isThumbUp, clientVote, votersUsername, small, handleClick }: Props) {
  const votersUsernameString = votersUsername.join(", ")
  const badgeColor = isThumbUp ? "info" : "warning"
  const icon = isThumbUp ? <ThumbUpIcon /> : <ThumbDownIcon />

  return (
    <Tooltip title={votersUsernameString}>
      <Badge color={badgeColor} badgeContent={votersUsername.length}>
        <IconButton sx={style_button(isThumbUp, clientVote, small)} onClick={() => handleClick(isThumbUp)}>
          {icon}
        </IconButton>
      </Badge>
    </Tooltip>
  )
}

const style_button = (buttonVoteType: boolean, clientVote: boolean | undefined, small: boolean | undefined) => {
  const buttonType = buttonVoteType ? "thumbUp" : "thumbDown"
  const buttonMainColor = buttonType === "thumbUp" ? "primary.light" : "warning.main"
  const size = small ? "30px" : "inherit"

  const getIconColor = () => {
    const buttonIsPressed =
      (clientVote === true && buttonType === "thumbUp") || (clientVote === false && buttonType === "thumbDown")
    return buttonIsPressed ? buttonMainColor : "gray"
  }

  return {
    width: size,
    height: size,
    borderColor: buttonMainColor,
    color: getIconColor(),
    backgroundColor: "background.paper",
  }
}
