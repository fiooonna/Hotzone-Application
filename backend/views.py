from django.http import HttpResponse, HttpRequest
from django.views.generic import TemplateView
from .models import Geodata
from django.contrib.auth import authenticate, login, logout
import requests
from django.views.decorators.csrf import csrf_exempt,csrf_protect 
import json
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Case

def loadParams(body):
  body_unicode = body.decode('utf-8')
  body = json.loads(body_unicode)
  params = body['params']
  return params

class getInfoView(APIView):
  permission_classes = (IsAuthenticated,)    
  @csrf_exempt
  def post(self, request):
    current_user = request.user
    info =  {
      "status": "Success",
      "username": current_user.username,
      "first": current_user.first_name,
      "last":current_user.last_name
    }
    return Response(info)

class signoutView(APIView):
  permission_classes = (IsAuthenticated,)    
  @csrf_exempt
  def post(self, request):
    logout(request)
    info =  {
      "status": "Success",
    }
    return Response(info)


def locationSearch(request,searchTerm):
  x = requests.get('https://geodata.gov.hk/gs/api/v1.0.0/locationSearch?q='+searchTerm)
  return HttpResponse(x)
  #response = requests.get('http://my-ulr.com')
  
# def getTableData(request):
  
@csrf_exempt
def viewDetail(request):
  obj = Case.objects.get(case_no=1)
  return (obj)

@csrf_exempt
def addLocation(request):
  body_unicode = request.body.decode('utf-8')
  body = json.loads(body_unicode)
  Geodata.objects.create(location_name=body['nameEN'],address=body['addressEN'],Xcoord=body['x'],Ycoord=body['y'])
  return HttpResponse("Success")

@csrf_exempt
def signin(request):
  params = loadParams(request.body)
  print(params)
  # user = authenticate(username=params['username'], password=params['password'])
  # if user is not None:
  #   token = Token.objects.get_or_create(user=user)
  #   print(token)
  #   response =  {
  #     "status": "Success",
  #     "token": token[0].key
  #   }
     
  #   return HttpResponse(json.dumps(response))
  # else: 
  #   response =  {
  #     "status": "Failed",
  #   }
  #   return HttpResponse(json.dumps(response))

  username = params['username']
  password = params['password']
  user = authenticate(request, username=username, password=password)
  if user is not None:
    login(request, user)
    current_user = request.user
    token = Token.objects.get_or_create(user=user)
    print(token)
    response =  {
      "status": "Success",
      "token": token[0].key,
    }
    return HttpResponse(json.dumps(response))
  else: 
    response =  {
      "status": "Failed",
    }
    return HttpResponse(json.dumps(response))


