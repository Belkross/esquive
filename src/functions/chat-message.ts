export class ChatMessage {
  author: string
  content: string
  date: number
  constructor(username: string, message: string) {
    this.author = username
    this.content = message
    this.date = Date.now()
  }
}
