from django.shortcuts import render
from .models import *
from .serializers import *
from rest_framework.response import Response
from rest_framework import mixins, generics
from rest_framework import viewsets


# Create your views here.
class StudentsVeiw(generics.ListCreateAPIView):
    queryset = Students.objects.all()
    serializer_class = StudentSerializer
    