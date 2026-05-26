import { useState } from 'react'
import { Sidebar } from '@/components/layout/Sidebar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Save } from 'lucide-react'

export default function Settings() {
  const [nvidiaKey, setNvidiaKey] = useState(localStorage.getItem('NVIDIA_API_KEY') || '')

  const handleSave = () => {
    localStorage.setItem('NVIDIA_API_KEY', nvidiaKey)
    alert('Settings saved. Your Nvidia NIM API key will now be used for chat sessions.')
  }

  return (
    <div className="flex h-screen w-full bg-canvas text-ink">
      <Sidebar />
      <main className="flex-1 p-12 overflow-y-auto">
        <div className="max-w-2xl mx-auto space-y-8">
          <div>
            <h1 className="font-display text-[40px] tracking-tight mb-2">Settings</h1>
            <p className="text-body text-[16px]">Manage your API keys, models, and preferences.</p>
          </div>

          <Card className="bg-surface-card border-hairline-strong rounded-lg shadow-none">
            <CardHeader>
              <CardTitle className="text-ink text-xl">API Configuration</CardTitle>
              <CardDescription className="text-body">Connect your LLM providers to power the agents.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label className="text-[14px] font-medium text-ink">Nvidia NIM API Key</label>
                <Input 
                  type="password" 
                  value={nvidiaKey}
                  onChange={e => setNvidiaKey(e.target.value)}
                  placeholder="nvapi-..." 
                  className="bg-surface-deep border-hairline-strong text-ink h-10"
                />
                <p className="text-mute text-[12px]">Used for Nvidia NIM Llama 3 inference.</p>
              </div>
              
              <div className="space-y-2">
                <label className="text-[14px] font-medium text-ink">Local Ollama URL</label>
                <Input 
                  disabled
                  value="http://localhost:11434"
                  className="bg-surface-deep border-hairline-strong text-mute h-10 opacity-50"
                />
                <p className="text-mute text-[12px]">Configure this in your backend .env file.</p>
              </div>

              <Button onClick={handleSave} className="bg-primary text-primary-foreground hover:bg-surface-light h-9 px-6 rounded-md font-medium">
                <Save size={16} className="mr-2" />
                Save Preferences
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
