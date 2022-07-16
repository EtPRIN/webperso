#from django.http import HttpResponse
from django.shortcuts import render

def snake(request):
    return render(request,'core/snake.html')

def CV(request):
    return render(request,'core/CV.html')

def forum(request):
    return render(request,'core/forum.html')

def objetMessages(request):
    return render(request,'core/')