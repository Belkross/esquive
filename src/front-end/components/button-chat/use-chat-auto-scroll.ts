import { RefObject, useEffect, useState } from "react"
import { ChatMessage } from "../../../back-end/config/room-state/methods/add-chat-message.js"

export function useChatAutoScroll(messages: ChatMessage[], ulElementRef: RefObject<HTMLUListElement>) {
  const [storedMessageDate, setStoredMessageDate] = useState(Date.now())

  const lastMessageDate = messages[messages.length - 1].date
  const newMessageReceived = lastMessageDate > storedMessageDate

  //unique auto-scroll on opening of the drawer
  useEffect(() => {
    if (ulElementRef.current) ulElementRef.current.scrollTop = ulElementRef.current.scrollHeight
  }, [ulElementRef])

  //auto-scroll everytime a new message is received and the scroll bar not to hight (meaning the user is reading ancient messages)
  useEffect(() => {
    if (newMessageReceived) {
      if (ulElementRef.current && checkIfNeedToScrollDown(ulElementRef.current)) {
        ulElementRef.current.scrollTop = ulElementRef.current.scrollHeight
      }
      setStoredMessageDate(lastMessageDate)
    }
  }, [lastMessageDate, newMessageReceived, ulElementRef])
}

const NO_SCROLL_WINDOW = 150
function checkIfNeedToScrollDown(ulElement: HTMLUListElement) {
  const scrollBarPosition = ulElement.scrollTop
  const scrollBarSize = ulElement.clientHeight
  const scrollHeight = ulElement.scrollHeight - NO_SCROLL_WINDOW

  return scrollBarPosition + scrollBarSize >= scrollHeight
}
