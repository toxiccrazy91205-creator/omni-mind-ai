import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Bot, User, Send, StopCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

type Message = {
  id: string
  role: 'user' | 'assistant'
  content: string
}

export function ChatBox({ agentId }: { agentId: string }) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [sessionId, setSessionId] = useState<string | null>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    // For MVP, create a new session when component mounts if not exists
    const initSession = async () => {
      try {
        const nvidiaKey = localStorage.getItem('NVIDIA_API_KEY') || ''
        const res = await fetch('/api/chat/sessions/', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'X-Nvidia-Api-Key': nvidiaKey 
          },
          body: JSON.stringify({ title: `New ${agentId} Chat`, agent_type: agentId })
        })
        const data = await res.json()
        setSessionId(data.id)
        if (data.messages) setMessages(data.messages)
      } catch (err) {
        console.error(err)
      }
    }
    initSession()
  }, [agentId])

  const handleSend = async () => {
    if (!input.trim() || !sessionId) return
    const userMsg = input
    setInput('')
    
    // Optimistic UI update
    const tempId = Date.now().toString()
    setMessages(prev => [...prev, { id: tempId, role: 'user', content: userMsg }])
    setIsLoading(true)

    try {
      const nvidiaKey = localStorage.getItem('NVIDIA_API_KEY') || ''
      await fetch(`/api/chat/sessions/${sessionId}/messages/`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'X-Nvidia-Api-Key': nvidiaKey
        },
        body: JSON.stringify({ role: 'user', content: userMsg })
      })

      // Fetch updated messages
      const res = await fetch(`/api/chat/sessions/${sessionId}/messages/`)
      const data = await res.json()
      setMessages(data)
    } catch (err) {
      console.error(err)
      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'assistant', content: 'Network Error: Could not reach the backend.' }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-full bg-canvas text-ink relative">
      <div className="flex-1 overflow-y-auto p-8 space-y-6">
        {messages.map((msg) => (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            key={msg.id} 
            className={`flex gap-4 max-w-4xl mx-auto ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
              msg.role === 'user' ? 'bg-surface-elevated text-ink' : 'bg-accent-blue/10 text-accent-blue'
            }`}>
              {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
            </div>
            <div className={`flex-1 text-[16px] leading-[1.6] px-4 py-3 rounded-lg border ${
              msg.role === 'user' 
                ? 'bg-surface-card border-hairline-strong text-ink' 
                : 'bg-transparent border-transparent text-body'
            }`}>
              {msg.role === 'assistant' ? (
                <div className="prose prose-invert prose-p:leading-relaxed prose-pre:bg-surface-deep prose-pre:border prose-pre:border-hairline-strong prose-pre:rounded-lg max-w-none">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {msg.content}
                  </ReactMarkdown>
                </div>
              ) : (
                msg.content
              )}
            </div>
          </motion.div>
        ))}
        {isLoading && (
          <div className="flex gap-4 max-w-4xl mx-auto">
            <div className="w-8 h-8 rounded-full bg-accent-blue/10 text-accent-blue flex items-center justify-center shrink-0">
              <Bot size={16} />
            </div>
            <div className="flex items-center text-body px-4">
              <span className="animate-pulse">Thinking...</span>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="p-4 border-t border-hairline bg-canvas">
        <div className="max-w-4xl mx-auto relative flex items-center">
          <Input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                handleSend()
              }
            }}
            placeholder="Send a message..."
            className="w-full bg-surface-card border-hairline-strong text-ink rounded-lg pr-12 h-12 text-[16px] placeholder:text-mute focus-visible:ring-1 focus-visible:ring-hairline-strong"
          />
          <Button 
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            variant="ghost" 
            size="icon" 
            className="absolute right-2 text-mute hover:text-ink hover:bg-surface-elevated rounded-md h-8 w-8"
          >
            {isLoading ? <StopCircle size={18} /> : <Send size={18} />}
          </Button>
        </div>
      </div>
    </div>
  )
}
