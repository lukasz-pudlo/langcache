from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AddPhraseView, UploadTextView, DisplayTranslationsView, LanguageViewSet, PhraseViewSet, TranslationViewSet

router = DefaultRouter()
router.register(r'languages', LanguageViewSet, basename='language')
router.register(r'phrases', PhraseViewSet, basename='phrase')
router.register(r'translations', TranslationViewSet, basename='translation')

urlpatterns = [
    path('add_phrase/', AddPhraseView.as_view(), name='add_phrase'),
    path('upload_text/', UploadTextView.as_view(), name='upload_text'),
    path('translations/', DisplayTranslationsView.as_view(),
         name='display_translations'),
    path('api/', include(router.urls)),
]
