from django.urls import path, include
from rest_framework_nested import routers
from .views import ChatSessionViewSet, MessageViewSet

router = routers.SimpleRouter()
router.register(r'sessions', ChatSessionViewSet, basename='chatsession')

session_router = routers.NestedSimpleRouter(router, r'sessions', lookup='session')
session_router.register(r'messages', MessageViewSet, basename='session-messages')

urlpatterns = [
    path('', include(router.urls)),
    path('', include(session_router.urls)),
]
