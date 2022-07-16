import imp
from rest_framework import serializers
from core.models import ObjetMessageTest,ObjetContactTest

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ObjetMessageTest
        fields = '__all__'

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = ObjetContactTest
        fields = '__all__'