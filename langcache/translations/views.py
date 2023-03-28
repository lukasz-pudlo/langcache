from django.shortcuts import render
from django.views import View
from django.http import JsonResponse
from .models import Language, Word, Translation


class AddWordView(View):
    def get(self, request):
        # Render the template for adding words manually
        return render(request, 'translations/add_word.html')

    def post(self, request):
        # Handle the form submission for adding a word manually
        source_word = request.POST['source_word']
        target_word = request.POST['target_word']
        source_language = Language.objects.get(
            id=request.POST['source_language'])
        target_language = Language.objects.get(
            id=request.POST['target_language'])

        word, _ = Word.objects.get_or_create(
            word=source_word, language=source_language)
        translation, _ = Translation.objects.get_or_create(
            word=word, translation=target_word, language=target_language)

        return JsonResponse({'status': 'success', 'message': 'Word and translation added successfully'})


class UploadTextView(View):
    def get(self, request):
        # Render the template for uploading text
        return render(request, 'translations/upload_text.html')

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
        return render(request, 'translations/display_translations.html', {'translations': translations})
