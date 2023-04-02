from django.contrib import admin

from .models import Phrase, Translation, Language

admin.site.register(Phrase)
admin.site.register(Translation)
admin.site.register(Language)
