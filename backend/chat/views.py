from rest_framework import viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import ChatSession, Message
from .serializers import ChatSessionSerializer, MessageSerializer

class ChatSessionViewSet(viewsets.ModelViewSet):
    serializer_class = ChatSessionSerializer
    permission_classes = [AllowAny] # Change to IsAuthenticated later

    def get_queryset(self):
        # Allow anonymous for now if no user
        if self.request.user.is_authenticated:
            return ChatSession.objects.filter(user=self.request.user)
        return ChatSession.objects.all()

    def perform_create(self, serializer):
        if self.request.user.is_authenticated:
            serializer.save(user=self.request.user)
        else:
            serializer.save()

class MessageViewSet(viewsets.ModelViewSet):
    serializer_class = MessageSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return Message.objects.filter(session_id=self.kwargs['session_pk'])

    def perform_create(self, serializer):
        session = ChatSession.objects.get(pk=self.kwargs['session_pk'])
        
        # Save user message
        user_message = serializer.save(session=session, role='user')

        # Try to invoke agent
        try:
            from agents.workflows import invoke_agent
            history = Message.objects.filter(session=session).order_by('created_at')
            history_list = [{'role': msg.role, 'content': msg.content} for msg in list(history)[:-1]] # exclude the new message

            nvidia_key = self.request.headers.get('X-Nvidia-Api-Key')
            response_content = invoke_agent(session.agent_type, user_message.content, history_list, nvidia_key=nvidia_key)
            
            # Save assistant message
            Message.objects.create(session=session, role='assistant', content=response_content)
        except Exception as e:
            # Fallback message
            Message.objects.create(session=session, role='assistant', content=f"Error generating response: {str(e)}\nPlease configure API keys in .env")
