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
from datetime import date,datetime
from .cluster import cluster
import numpy as np

def loadParams(body):
  body_unicode = body.decode('utf-8')
  body = json.loads(body_unicode)
  params = body['params']
  return params



class getInfoView(APIView):
  permission_classes = (AllowAny,)
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
  permission_classes = (AllowAny,)
  @csrf_exempt
  def post(self, request):
    logout(request)
    info =  {
      "status": "Success",
    }
    return Response(info)

class getAllCaseView(APIView):
  permission_classes = (AllowAny,)

  @csrf_exempt
  def post(self, request):
    obj = Case.objects.all()
    obj_p = Patient.objects.all()
    obj_v = Virus.objects.all()
    serializer = CaseSerializer(obj,many=True)
    serializer_p = PatientSerializer(obj_p,many=True)
    serializer_v = VirusSerializer(obj_v,many=True)
    for data_c in serializer.data:
      for data_p in serializer_p.data:
        if data_c.get("patient") == data_p.get("hkid"):
          data_c["patient_name"] = data_p.get("patient_name")
    for data_c in serializer.data:
      for data_v in serializer_v.data:
        if data_c.get("virus") == data_v.get("id"):
          data_c["virus_name"] = data_v.get("common_name")
    return Response(serializer.data)

class getCaseByIdView(APIView):
  permission_classes = (AllowAny,)

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
  permission_classes = (AllowAny,)

  @csrf_exempt
  def post(self, request):
    obj = Virus.objects.all()
    serializer = VirusSerializer(obj,many=True)
    return Response(serializer.data)

# For getting the information of the patient
class getPatientInfo(APIView):
  permission_classes = (AllowAny,)

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
@csrf_exempt
def locationSearch(request):
  params = loadParams(request.body)
  x = requests.get('https://geodata.gov.hk/gs/api/v1.0.0/locationSearch?q='+params['locationTerm'])
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
def addPatientinfo(params):
  pname = params['patientName']
  pid = params['patientID']
  pname = params['patientName']
  pdob = params['patientDOB']
  try:
      patient=Patient.objects.get(hkid=pid)
      return patient

  except:
      p=Patient.objects.create(patient_name=pname, hkid=pid, birth_date= pdob)
      return p




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

#@csrf_exempt
#def addLocation(request):
 # body_unicode = request.body.decode('utf-8')
  #body = json.loads(body_unicode)

  #return HttpResponse("Success")

@csrf_exempt
def findCluster(request):
    params = loadParams(request.body)
    print(params)
    objs_v = Visited.objects.select_related('geodata').all()
    if(len(objs_v)<1):
      response =  {
      "status": "Success",
      "clusters":list()
      }
      return HttpResponse(json.dumps(response))
    vectors_4d = list()
    day_0 = date.fromisoformat('2020-01-01')
    for case in objs_v:
      vector = list()
      geodata = case.geodata
      vector.append(float(geodata.Xcoord))
      vector.append(float(geodata.Ycoord))
      vector.append((case.date_from-day_0).days   )
      
      vector.append(int(case.case_no.case_no))
      vectors_4d.append(vector)
    Dvalue = params['Dvalue']
    Tvalue = params['Tvalue']
    Cvalue = params['Cvalue']

    result = cluster(np.array(vectors_4d),int(Dvalue),int(Tvalue),int(Cvalue))
    # implement your backend function here to find cluster
    # print(Dvalue, Tvalue, Cvalue)
    print(result)
    response =  {
      "status": "Success",
      "clusters":result
    }

    
    return HttpResponse(json.dumps(response))

@csrf_exempt
def submitCase(request):
  params=loadParams(request.body)
  pDateConfirmed = params['patient']['dateConfirmed']
  plocalImported = params['patient']['localImported']
  patient=addPatientinfo(params['patient'])
  virus = Virus.objects.get(virus_name=params['patient']['virusName'])
  c=Case.objects.create(date_confirmed=pDateConfirmed, local_or_imported=plocalImported,patient=patient, virus=virus)
  locationarray=params['location']
  
  for i in range(len(locationarray)):
    x = float(locationarray[i]['location']['x'])
    y = float(locationarray[i]['location']['y'])
    try: 
      geodata=Geodata.objects.get(Xcoord=x, Ycoord=y)
      Visited.objects.create(date_from=locationarray[i]['dateFrom'],date_to=locationarray[i]['dateTo'],category=locationarray[i]['category'],case_no=c,geodata=geodata)
    except:
      geodata=Geodata.objects.create(location_name=locationarray[i]['location']['nameEN'],address=locationarray[i]['location']['addressEN'],Xcoord=x,Ycoord=y)
      Visited.objects.create(date_from=locationarray[i]['dateFrom'],date_to=locationarray[i]['dateTo'],category=locationarray[i]['category'],case_no=c,geodata=geodata)
      
  response={
    "status": "Success",
  }
  return HttpResponse(json.dumps(response))

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
