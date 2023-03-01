import { RefObject, useEffect } from "react"

export function useAutoScroll<Type>(messages: Type[], ulElement: RefObject<HTMLUListElement>) {
  useEffect(() => {
    if (ulElement.current) {
      ulElement.current.scrollTop = ulElement.current.scrollHeight
    }
  }, [messages, ulElement])
}
