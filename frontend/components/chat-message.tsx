import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Scale, User } from "lucide-react"

interface ChatMessageProps {
  message: {
    id: number
    role: string
    content: string
    attachments?: string[]
  }
  isUser: boolean
}

export function ChatMessage({ message, isUser }: ChatMessageProps) {
  return (
    <div className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser && (
        <Avatar className="h-8 w-8">
          <AvatarImage src="/placeholder.svg?height=32&width=32" alt="AI" />
          <AvatarFallback>
            <Scale className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
      )}

      <div className={`flex flex-col max-w-[80%] ${isUser ? "items-end" : "items-start"}`}>
        <div className={`rounded-lg p-4 ${isUser ? "bg-primary text-primary-foreground" : "bg-gray-100"}`}>
          <div 
            className="text-sm whitespace-pre-line" 
            dangerouslySetInnerHTML={{ __html: message.content }}
          />
          {message.attachments && message.attachments.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {message.attachments.map((file, index) => (
                <Badge key={index} variant={isUser ? "outline" : "secondary"}>
                  {file}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>

      {isUser && (
        <Avatar className="h-8 w-8">
          <AvatarImage src="/user.svg?height=32&width=32" alt="User" />
          <AvatarFallback>
            <User className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  )
}
