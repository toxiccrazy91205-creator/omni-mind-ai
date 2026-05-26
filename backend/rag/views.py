from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status
from .models import Document
import PyPDF2

# A simple global dictionary acting as our "memory" vector DB for the MVP.
# In a full deployment, replace this with chromadb Client.
RAG_CONTEXT_STORE = ""

class DocumentUploadView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        file_obj = request.FILES.get('file')
        if not file_obj:
            return Response({"error": "No file provided"}, status=status.HTTP_400_BAD_REQUEST)

        doc = Document.objects.create(file=file_obj, filename=file_obj.name)
        
        # Parse the file
        extracted_text = ""
        try:
            if file_obj.name.endswith('.pdf'):
                reader = PyPDF2.PdfReader(file_obj)
                for page in reader.pages:
                    text = page.extract_text()
                    if text:
                        extracted_text += text + "\n"
            else:
                extracted_text = file_obj.read().decode('utf-8', errors='ignore')
                
            # Append to global store (MVP approach instead of chromadb to avoid memory crashes on setup)
            global RAG_CONTEXT_STORE
            RAG_CONTEXT_STORE += f"\n\n--- Document: {file_obj.name} ---\n" + extracted_text
            
            return Response({"message": "File uploaded and processed successfully", "id": doc.id}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class RAGContextView(APIView):
    def get(self, request):
        global RAG_CONTEXT_STORE
        return Response({"context": RAG_CONTEXT_STORE})
