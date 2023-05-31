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
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {
                "role": "system",
                "content": "You are an experienced translator. When asked to translate a word from a given language into another language, you provide only the translated word or phrase. Nothing else."
            },
            {
                "role": "user",
                "content": f'Translate the word "{word}" from {source_language} into {target_language}. You need to provide only the translated word or phrase. You should never add any additional comments.'
            },
        ],
    )
    meaning = response['choices'][0]['message']['content']
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
