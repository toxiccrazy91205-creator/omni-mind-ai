import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Bot, Code, Edit3, Search, Zap } from 'lucide-react'

const agents = [
  { id: 'research', name: 'Research Agent', icon: Search, desc: 'Deep dive into topics with web search and RAG.', color: 'accent-blue' },
  { id: 'coding', name: 'Coding Agent', icon: Code, desc: 'Write, debug, and review code collaboratively.', color: 'accent-yellow' },
  { id: 'content', name: 'Content Agent', icon: Edit3, desc: 'Generate high-quality articles and markdown.', color: 'accent-orange' },
  { id: 'automation', name: 'Automation Agent', icon: Zap, desc: 'Automate repetitive workflows and tasks.', color: 'accent-green' },
  { id: 'rag', name: 'RAG Agent', icon: Bot, desc: 'Chat directly with your uploaded documents.', color: 'accent-red' },
]

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-canvas text-ink font-sans selection:bg-surface-elevated">
      {/* Navbar placeholder */}
      <nav className="h-16 border-b border-hairline flex items-center px-8 justify-between">
        <div className="font-display text-xl tracking-tight">OmniMind</div>
        <div className="flex gap-4">
          <Link to="/settings">
            <Button variant="ghost" className="text-body hover:text-ink hover:bg-surface-elevated h-9 rounded-md">Settings</Button>
          </Link>
          <Link to="/agents/rag">
            <Button className="bg-primary text-primary-foreground hover:bg-surface-light h-9 rounded-md font-medium tracking-wide px-4">
              New Chat
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Stripe */}
      <section className="relative px-8 pt-[96px] pb-[96px] overflow-hidden">
        {/* Atmospheric Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-accent-blue/20 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-[76px] leading-[1.0] tracking-[-0.01em] mb-6"
          >
            AI OS reimagined
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-[20px] text-body max-w-2xl mx-auto leading-[1.3] mb-10 font-sans"
          >
            Access specialized agents for research, coding, and automation in one unified canvas. Powered by local and free models.
          </motion.p>
        </div>
      </section>

      {/* Agents Grid */}
      <section className="px-8 pb-[128px] max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {agents.map((agent, i) => (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
            >
              <Card className="bg-surface-card border-hairline-strong rounded-lg p-8 h-full hover:bg-surface-elevated transition-colors border shadow-none flex flex-col">
                <CardHeader className="p-0 mb-4 flex flex-row items-center gap-4 space-y-0">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-${agent.color}/10 text-${agent.color}`}>
                    <agent.icon size={20} />
                  </div>
                  <CardTitle className="text-[24px] font-medium leading-[1.5] tracking-[-0.01em] text-ink">{agent.name}</CardTitle>
                </CardHeader>
                <CardContent className="p-0 flex-1">
                  <p className="text-[16px] text-body leading-[1.5] tracking-[-0.05em]">
                    {agent.desc}
                  </p>
                </CardContent>
                <CardFooter className="p-0 mt-8">
                  <Link to={`/agents/${agent.id}`} className="w-full">
                    <Button variant="outline" className="border-hairline-strong bg-transparent text-ink hover:bg-surface-elevated hover:text-ink w-full rounded-md h-[36px]">
                      Launch Agent
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}
