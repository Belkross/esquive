import { RefObject, useEffect } from "react"
import { ChatMessage } from "../../../functions/chat-message.js"

export function useChatAutoScrollDown(messages: ChatMessage[], ulElement: RefObject<HTMLUListElement>) {
  useEffect(() => {
    if (ulElement.current && checkIfNeedToScrollDown(ulElement.current)) {
      ulElement.current.scrollTop = ulElement.current.scrollHeight
    }
  }, [messages, ulElement])
}

const NO_SCROLL_WINDOW = 50
function checkIfNeedToScrollDown(ulElement: HTMLUListElement) {
  const scrollBarPosition = ulElement.scrollTop
  const scrollBarSize = ulElement.clientHeight
  const scrollHeight = ulElement.scrollHeight - NO_SCROLL_WINDOW

  return scrollBarPosition + scrollBarSize >= scrollHeight
}
