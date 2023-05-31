from rest_framework import viewsets
from .serializers import LanguageSerializer, PhraseSerializer, TranslationSerializer
from django.shortcuts import render
from django.views import View
from django.http import JsonResponse
from .models import Language, Phrase, Translation
from .forms import AddPhraseForm, UploadTextForm

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import requests
from bs4 import BeautifulSoup

from django.conf import settings

import openai
openai.api_key = settings.OPENAI_API_KEY


@csrf_exempt
def chatGPT_meaning(request, word, source_language, target_language):
    headers = {
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {openai.api_key}'
    }

    # Description of the task in natural language
    task_description = 'Translate a word or phrase in one language into another language.'

    # The text to translate
    to_translate = f'"{word}" from {source_language} into {target_language}"'

    prompt = task_description+"\n"+to_translate

    response = openai.Completion.create(
        model="text-curie-001",
        prompt=prompt,
        temperature=0.3,
        max_tokens=2000,
        top_p=1.0,
        frequency_penalty=0.0,
        presence_penalty=0.0
    )
    meaning = response['choices'][0]['text']
    return JsonResponse({"meaning": meaning})


class LanguageViewSet(viewsets.ModelViewSet):
    queryset = Language.objects.all()
    serializer_class = LanguageSerializer


class PhraseViewSet(viewsets.ModelViewSet):
    queryset = Phrase.objects.all()
    serializer_class = PhraseSerializer


class TranslationViewSet(viewsets.ModelViewSet):
    queryset = Translation.objects.all()
    serializer_class = TranslationSerializer
