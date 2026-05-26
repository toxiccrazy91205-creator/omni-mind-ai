from django.urls import path
from .views import DocumentUploadView, RAGContextView

urlpatterns = [
    path('upload/', DocumentUploadView.as_view(), name='document_upload'),
    path('context/', RAGContextView.as_view(), name='rag_context'),
]
