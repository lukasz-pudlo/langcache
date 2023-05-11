from django import forms
from .models import Language, Phrase, Translation


class AddPhraseForm(forms.Form):
    text = forms.CharField(label='Phrase', max_length=510)
    language = forms.ModelChoiceField(
        queryset=Language.objects.all(), label='Language')


class UploadTextForm(forms.Form):
    text = forms.CharField(widget=forms.Textarea, label='Text')
    language = forms.ModelChoiceField(
        queryset=Language.objects.all(), label='Language')
