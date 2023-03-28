from django.shortcuts import render
from django.views import View
from django.http import JsonResponse
from .models import Language, Phrase, Translation


class AddPhraseView(View):
    def get(self, request):
        # Render the template for adding phrases manually
        return render(request, 'add_phrase.html')

    def post(self, request):
        # Handle the form submission for adding a phrase manually
        source_phrase = request.POST['source_phrase']
        target_phrase = request.POST['target_phrase']
        source_language = Language.objects.get(
            id=request.POST['source_language'])
        target_language = Language.objects.get(
            id=request.POST['target_language'])

        phrase, _ = Phrase.objects.get_or_create(
            text=source_phrase, language=source_language)
        translation, _ = Translation.objects.get_or_create(
            phrase=phrase, translation=target_phrase, language=target_language)

        return JsonResponse({'status': 'success', 'message': 'Phrase and translation added successfully'})


class UploadTextView(View):
    def get(self, request):
        # Render the template for uploading text
        return render(request, 'upload_text.html')

    def post(self, request):
        # Handle the text upload and processing
        text = request.POST['text']
        # To be added later -  logic to process the text, extract unique words, and retrieve translations

        return JsonResponse({'status': 'success', 'message': 'Text uploaded and processed successfully'})


class DisplayTranslationsView(View):
    def get(self, request):
        # Fetch translations from the database
        translations = Translation.objects.all()

        # Render the template for displaying translations and pass the translations as context
        return render(request, 'display_translations.html', {'translations': translations})
