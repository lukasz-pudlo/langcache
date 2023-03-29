from rest_framework import viewsets
from .serializers import LanguageSerializer, PhraseSerializer, TranslationSerializer
from django.shortcuts import render
from django.views import View
from django.http import JsonResponse
from .models import Language, Phrase, Translation
from .forms import AddPhraseForm, UploadTextForm


class LanguageViewSet(viewsets.ModelViewSet):
    queryset = Language.objects.all()
    serializer_class = LanguageSerializer


class PhraseViewSet(viewsets.ModelViewSet):
    queryset = Phrase.objects.all()
    serializer_class = PhraseSerializer


class TranslationViewSet(viewsets.ModelViewSet):
    queryset = Translation.objects.all()
    serializer_class = TranslationSerializer
