from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import LanguageViewSet, PhraseViewSet, TranslationViewSet
from . import views


router = DefaultRouter()
router.register(r'languages', LanguageViewSet, basename='language')
router.register(r'phrases', PhraseViewSet, basename='phrase')
router.register(r'translations', TranslationViewSet, basename='translation')

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/gpt/<str:word>/<str:source_language>/<str:target_language>/',
         views.chatGPT_meaning),
]
