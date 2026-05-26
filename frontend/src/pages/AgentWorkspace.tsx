import { useParams } from 'react-router-dom'
import { Sidebar } from '@/components/layout/Sidebar'
import { ChatBox } from '@/components/chat/ChatBox'
import { FileUploader } from '@/components/rag/FileUploader'

export default function AgentWorkspace() {
  const { id } = useParams<{ id: string }>()

  return (
    <div className="flex h-screen w-full bg-canvas overflow-hidden">
      <Sidebar />
      
      {id === 'rag' && (
        <div className="w-80 border-r border-hairline bg-canvas p-6 flex flex-col">
          <h2 className="text-ink font-medium text-[16px] mb-6">RAG Context</h2>
          <FileUploader />
        </div>
      )}

      <main className="flex-1 h-full relative">
        <ChatBox agentId={id || 'chat'} />
      </main>
    </div>
  )
}
