from django.http import HttpResponse, HttpRequest
from django.views.generic import TemplateView
from django.shortcuts import render
from .models import VisitedLocation
import requests
from django.views.decorators.csrf import csrf_exempt,csrf_protect #Add this
import json


def locationSearch(request,searchTerm):
  x = requests.get('https://geodata.gov.hk/gs/api/v1.0.0/locationSearch?q='+searchTerm)
  return HttpResponse(x)
  #response = requests.get('http://my-ulr.com')
  
@csrf_exempt
def addLocation(request):
  body_unicode = request.body.decode('utf-8')
  body = json.loads(body_unicode)
  VisitedLocation.objects.create(location=body['nameEN'],address=body['addressEN'],xcoord=body['x'],ycoord=body['y'])
  return HttpResponse("Success")