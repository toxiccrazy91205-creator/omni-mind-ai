import { useState } from 'react'
import { UploadCloud, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function FileUploader() {
  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
      setSuccess(false)
    }
  }

  const handleUpload = async () => {
    if (!file) return
    setIsUploading(true)
    const formData = new FormData()
    formData.append('file', file)

    try {
      const res = await fetch('http://localhost:8000/api/rag/upload/', {
        method: 'POST',
        body: formData,
      })
      if (res.ok) {
        setSuccess(true)
        setFile(null)
      } else {
        console.error('Upload failed')
      }
    } catch (err) {
      console.error(err)
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="bg-surface-card border-hairline-strong border rounded-lg p-6 flex flex-col items-center justify-center text-center space-y-4">
      <div className="w-12 h-12 rounded-full bg-surface-elevated flex items-center justify-center text-mute mb-2">
        {success ? <CheckCircle className="text-accent-green" size={24} /> : <UploadCloud size={24} />}
      </div>
      
      <div>
        <h3 className="text-ink font-medium tracking-[-0.01em]">{success ? 'Document Processed' : 'Upload Document'}</h3>
        <p className="text-body text-[14px] max-w-[200px] mt-1 leading-[1.4]">
          {success ? 'Agent now has context from your file.' : 'PDF or TXT for RAG context'}
        </p>
      </div>

      {!success && (
        <div className="flex flex-col gap-2 w-full mt-4">
          <input 
            type="file" 
            id="file-upload" 
            className="hidden" 
            accept=".pdf,.txt,.docx"
            onChange={handleFileChange}
          />
          <label 
            htmlFor="file-upload" 
            className="w-full h-9 rounded-md border border-hairline-strong bg-transparent text-ink hover:bg-surface-elevated transition-colors flex items-center justify-center cursor-pointer text-[14px] font-medium"
          >
            {file ? file.name : 'Choose File'}
          </label>
          {file && (
            <Button 
              onClick={handleUpload} 
              disabled={isUploading}
              className="w-full h-9 rounded-md bg-primary text-primary-foreground hover:bg-surface-light font-medium"
            >
              {isUploading ? 'Uploading...' : 'Upload & Process'}
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
