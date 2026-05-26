import { Link, useLocation } from 'react-router-dom'
import { Bot, Code, Edit3, Search, Zap, Settings, LayoutDashboard } from 'lucide-react'

const agents = [
  { id: 'research', name: 'Research', icon: Search },
  { id: 'coding', name: 'Coding', icon: Code },
  { id: 'content', name: 'Content', icon: Edit3 },
  { id: 'automation', name: 'Automation', icon: Zap },
  { id: 'rag', name: 'RAG', icon: Bot },
]

export function Sidebar() {
  const location = useLocation()

  return (
    <div className="w-64 bg-canvas border-r border-hairline flex flex-col h-screen text-ink">
      <div className="p-4 border-b border-divider-soft flex items-center justify-between">
        <span className="font-display text-lg tracking-tight">OmniMind</span>
      </div>

      <div className="flex-1 overflow-y-auto py-4">
        <div className="px-3 mb-2">
          <Link 
            to="/" 
            className={`flex items-center gap-3 px-3 py-2 rounded-md text-[14px] transition-colors ${
              location.pathname === '/' ? 'bg-surface-elevated text-ink' : 'text-body hover:bg-surface-card hover:text-ink'
            }`}
          >
            <LayoutDashboard size={16} />
            Dashboard
          </Link>
        </div>

        <div className="px-4 mt-6 mb-2 text-[12px] font-medium tracking-wider text-mute uppercase">
          Agents
        </div>
        <div className="space-y-1 px-3">
          {agents.map((agent) => (
            <Link
              key={agent.id}
              to={`/agents/${agent.id}`}
              className={`flex items-center gap-3 px-3 py-2 rounded-md text-[14px] transition-colors ${
                location.pathname === `/agents/${agent.id}` ? 'bg-surface-elevated text-ink' : 'text-body hover:bg-surface-card hover:text-ink'
              }`}
            >
              <agent.icon size={16} />
              {agent.name}
            </Link>
          ))}
        </div>
      </div>

      <div className="p-4 border-t border-divider-soft">
        <Link 
          to="/settings" 
          className="flex items-center gap-3 px-3 py-2 rounded-md text-[14px] text-body hover:bg-surface-card hover:text-ink transition-colors"
        >
          <Settings size={16} />
          Settings
        </Link>
      </div>
    </div>
  )
}
