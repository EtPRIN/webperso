from rest_framework.response import Response
from django.shortcuts import render
from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_exempt
from core.models import ObjetMessageTest,ObjetContactTest
from .serializers import MessageSerializer,ContactSerializer

@api_view(['GET'])
def getContacts(request):
    messages = ObjetContactTest.objects.all()
    serializer = ContactSerializer(messages, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getMessages(request):
    messages = ObjetMessageTest.objects.all()
    serializer = MessageSerializer(messages, many=True)
    return Response(serializer.data)

@csrf_exempt
@api_view(['POST'])
def addMessage(request):
    serializer = MessageSerializer(data=request.data)
    print("#############################################")
    print(serializer)
    print("#############################################")
    if serializer.is_valid():
        serializer.save()
    return Response("Request received")

@csrf_exempt
@api_view(['POST'])
def addContact(request):
    serializer = ContactSerializer(data=request.data)
    print("#############################################")
    print(serializer)
    print("#############################################")
    if serializer.is_valid():
        serializer.save()
    return Response("Request received")

def ResContactEtMessage(request):
    ObjetContactTest.objects.all().delete()
    ObjetMessageTest.objects.all().delete()
    return render(request,'firstapp/forum.html')