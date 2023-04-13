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
def duden_meaning(request, word):
    try:
        url = f'https://www.duden.de/rechtschreibung/{word}'
        response = requests.get(url)
        soup = BeautifulSoup(response.content.decode(), 'html.parser')
        meanings = soup.find_all('div', {'class': 'enumeration__text'})
        meaning = ''
        if meanings:
            meaning = meanings[0].text.strip()
            return JsonResponse({"meaning": meaning})
        else:
            return JsonResponse({"error": "Meaning not found"}, status=404)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)


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
                "content": "Translate the word or phrase. In your response, provide only the translation and nothing else. Just the translation."
            },
            {
                "role": "user",
                "content": f'Translate the word "{word}" from {source_language} into {target_language}'
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
