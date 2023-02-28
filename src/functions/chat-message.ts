export class ChatMessage {
  author: string
  content: string
  date: Date
  constructor(username: string, message: string) {
    this.author = username
    this.content = message
    this.date = new Date()
  }
}