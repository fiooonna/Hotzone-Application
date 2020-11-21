from django.http import HttpResponse, HttpRequest
from django.views.generic import TemplateView
from django.contrib.auth import authenticate, login, logout
import requests
from django.views.decorators.csrf import csrf_exempt,csrf_protect 
import json
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import *
from rest_framework import serializers
from .models import *
from rest_framework.decorators import api_view
from django.http import JsonResponse

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

class getAllCaseView(APIView):
  permission_classes = (IsAuthenticated,)

  @csrf_exempt
  def post(self, request):
    obj = Case.objects.all()
    serializer = CaseSerializer(obj,many=True)
    return Response(serializer.data)    

class getCaseByIdView(APIView):
  permission_classes = (IsAuthenticated,)

  @csrf_exempt
  def post(self, request):
    params = loadParams(request.body)
    obj = Case.objects.get(case_no=params['id'])
    serializer = CaseSerializer(obj,many=False)
    return Response(serializer.data)  

def locationSearch(request,searchTerm):
  x = requests.get('https://geodata.gov.hk/gs/api/v1.0.0/locationSearch?q='+searchTerm)
  return HttpResponse(x)
  #response = requests.get('http://my-ulr.com')
  
# def getTableData(request):
  

def json_default(value):
    if isinstance(value, datetime.date):
        return dict(year=value.year, month=value.month, day=value.day)
    else:
        return value.__dict__

  # permission_classes = [AllowAny]
@csrf_exempt
def viewDetail(request):
  obj = Case.objects.all()
  serializer = CaseSerializer(obj, many=True)
  # test = json.dumps(obj, default=lambda o: o.__dict__)
  print(serializer)
  return JsonResponse(serializer.data, safe=False)

@csrf_exempt
def addVinfo(request):
  params = loadParams(request.body)
  print(params)
  vname = params['vname']
  disease = params['disease']
  maxp = params['maxp']
  Virus.objects.create(virus_name=vname, common_name=disease, max_infect_period= maxp)
  return HttpResponse("Success")

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


