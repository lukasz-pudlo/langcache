from rest_framework import serializers
from .models import Language, Phrase, Translation
from django.contrib.auth.models import User


class LanguageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Language
        fields = ['id', 'name', 'code']


class PhraseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Phrase
        fields = ['id', 'text', 'language']


class TranslationSerializer(serializers.ModelSerializer):
    source_phrase = PhraseSerializer()
    target_phrase = PhraseSerializer()

    class Meta:
        model = Translation
        fields = ['id', 'user', 'source_phrase', 'target_phrase']
