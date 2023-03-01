import { Typography, ListItem, ListItemText, SxProps } from "@mui/material"
import { ChatMessage } from "../../../functions/chat-message.js"

type Props = {
  messages: ChatMessage[]
}

export default function MessageList({ messages }: Props) {
  const list_message = messages.map((message) => {
    const chatEntrie = (
      <>
        <Typography component="span" sx={style_authorTypo}>{`${message.author}`}</Typography>
        <Typography component="span">{`:\u00A0${message.content}`}</Typography>
      </>
    )

    return (
      <ListItem key={message.date.toString()} sx={style_container}>
        <ListItemText primary={chatEntrie} />
      </ListItem>
    )
  })

  return <>{list_message}</>
}

const style_authorTypo: SxProps = {
  color: "orange",
}

const style_container: SxProps = {
  px: 0,
  py: 0,
}
