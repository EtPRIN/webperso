from django.urls import path
from . import views

urlpatterns = [
    path('GET/contacts/',views.getContacts),
    path('POST/contacts/',views.addContact),
    path('GET/messages/',views.getMessages),
    path('POST/messages/',views.addMessage),
    path('DEL_ALL/',views.ResContactEtMessage),
]