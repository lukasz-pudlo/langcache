from django.db import models
from django.contrib.auth.models import User


class Language(models.Model):
    name = models.CharField(max_length=100)
    code = models.CharField(max_length=10)

    def __str__(self):
        return self.name


class Phrase(models.Model):
    text = models.CharField(max_length=510)
    language = models.ForeignKey(Language, on_delete=models.CASCADE)

    def __str__(self):
        return self.text


class Translation(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    source_phrase = models.ForeignKey(
        Phrase, related_name='translations', on_delete=models.CASCADE)
    target_phrase = models.ForeignKey(
        Phrase, related_name='translated_from', on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.source_phrase} -> {self.target_phrase}'
