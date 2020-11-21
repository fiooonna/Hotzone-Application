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
from rest_framework import filters, generics

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
    case = Case.objects.get(case_no=params['id'])
    virus = case.virus
    patient = case.patient
    case_serializer = CaseSerializer(case,many=False)
    patient_serializer = PatientSerializer(patient, many=False)
    virus_serializer = VirusSerializer(virus, many=False)

    visited = Visited.objects.filter(case_no=params['id'])
    locations = list()
    for visit in visited:
      location = visit.geodata
      location_serializer = GeodataSerializer(location, many=False)
      locations.append(location_serializer.data)

    visited_serializer = VisitedSerializer(visited, many=True)
    response = {
      'case':case_serializer.data,
      "patient": patient_serializer.data,
      "virus": virus_serializer.data,
      "visited": visited_serializer.data,
      "locations": locations
    }
    return Response(response)

class getAllVirusView(APIView):
  permission_classes = (IsAuthenticated,)

  @csrf_exempt
  def post(self, request):
    obj = Virus.objects.all()
    serializer = VirusSerializer(obj,many=True)
    return Response(serializer.data)

# For getting the information of the patient
class getPatientInfo(APIView):
  permission_classes = (IsAuthenticated,)

  @csrf_exempt
  def post(self, request):
    obj = Patient.objects.all()
    serializer = PatientSerializer(obj, many = True)
    print(obj)
    return Response (serializer.data)

class patientFormVirus(generics.ListAPIView):
    queryset = Virus.objects.all()
    serializer_class = VirusSerializer(queryset,many=True)
    filter_backends = [filters.SearchFilter]
    search_fields = ['virus_name', 'common_name']

# class getVirusByIdView(APIView):
#   permission_classes = (IsAuthenticated,)

#   @csrf_exempt
#   def post(self, request):
#     params = loadParams(request.body)
#     obj = Virus.objects.get(case_no=params['id'])
#     serializer = VirusSerializer(obj,many=False)
#     return Response(serializer.data)

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

# Patient Information to backend
@csrf_exempt
def addPatientinfo(request):
  params = loadParams(request.body)
  print(params)
  pname = params['patientName']
  pid = params['patientID']
  pdob = params['patientDOB']
  pDateConfirmed = params['dateConfirmed']
  plocalImported = params['localImported']
  pVirus = params['virusName']
  p=Patient(patient_name=pname, hkid=pid, birth_date= pdob)

  #print(Patient.objects.count())
  #print(Patient.objects.get(patient_name="person15"))
  p.save()
  mylen = Virus.objects.count()+1
  #i=1
  for i in range(1, mylen):
    if (pVirus == str(Virus.objects.get(pk=i))):
      c=Case(date_confirmed=pDateConfirmed, local_or_imported=plocalImported,patient=p,virus=Virus.objects.get(pk=1))
      print("Info saved!")
      c.save()
  #virus=Virus.objects.get(pk=2); common_name; max_infect_period

  response =  {
      "status": "Success",
    }
  return HttpResponse(json.dumps(response))

@csrf_exempt
def addVinfo(request):
  params = loadParams(request.body)
  print(params)
  vname = params['vname']
  disease = params['disease']
  maxp = params['maxp']
  Virus.objects.create(virus_name=vname, common_name=disease, max_infect_period= maxp)
  response =  {
      "status": "Success",
    }
  return HttpResponse(json.dumps(response))

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
