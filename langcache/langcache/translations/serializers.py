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

    def create(self, validated_data):
        source_phrase_data = validated_data.pop('source_phrase')
        target_phrase_data = validated_data.pop('target_phrase')

        source_language = Language.objects.get(
            pk=source_phrase_data['language'].id)
        target_language = Language.objects.get(
            pk=target_phrase_data['language'].id)

        source_phrase = Phrase.objects.create(
            text=source_phrase_data['text'], language=source_language)
        target_phrase = Phrase.objects.create(
            text=target_phrase_data['text'], language=target_language)

        translation = Translation.objects.create(
            user=validated_data['user'],
            source_phrase=source_phrase,
            target_phrase=target_phrase
        )

        return translation

    def update(self, instance, validated_data):
        source_phrase_data = validated_data.pop('source_phrase', None)
        target_phrase_data = validated_data.pop('target_phrase', None)

        if source_phrase_data:
            source_phrase = instance.source_phrase
            source_phrase.text = source_phrase_data.get(
                'text', source_phrase.text)
            source_phrase.language = source_phrase_data.get(
                'language', source_phrase.language)
            source_phrase.save()

        if target_phrase_data:
            target_phrase = instance.target_phrase
            target_phrase.text = target_phrase_data.get(
                'text', target_phrase.text)
            target_phrase.language = target_phrase_data.get(
                'language', target_phrase.language)
            target_phrase.save()

        return super().update(instance, validated_data)
