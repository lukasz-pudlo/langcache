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


class LanguageViewSet(viewsets.ModelViewSet):
    queryset = Language.objects.all()
    serializer_class = LanguageSerializer


class PhraseViewSet(viewsets.ModelViewSet):
    queryset = Phrase.objects.all()
    serializer_class = PhraseSerializer


class TranslationViewSet(viewsets.ModelViewSet):
    queryset = Translation.objects.all()
    serializer_class = TranslationSerializer
