from unittest.util import _MAX_LENGTH
from django.db import models

class ObjetMessageTest(models.Model):
    contenueMessage = models.fields.CharField(max_length=1000)
    auteur = models.fields.CharField(max_length=100)
    destinataire = models.fields.CharField(max_length=100)

class ObjetContactTest(models.Model):
    nom = models.fields.CharField(max_length=100)