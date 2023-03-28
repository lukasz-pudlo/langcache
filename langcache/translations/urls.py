from django.urls import path
from . import views

urlpatterns = [
    path('add_phrase/', views.AddPhraseView.as_view(), name='add_phrase'),
    path('upload_text/', views.UploadTextView.as_view(), name='upload_text'),
    path('translations/', views.DisplayTranslationsView.as_view(),
         name='display_translations'),
]
