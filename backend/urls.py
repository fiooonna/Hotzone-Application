from django.urls import include, path
from rest_framework import routers
from . import views


urlpatterns = [
  path("location/<str:searchTerm>",views.locationSearch,name="location"),
  path("add/",views.addLocation,name="addLocation"),
  path("signin/",views.signin,name="login"),
  path("signout/",views.signoutView.as_view(),name="signout"),
  path("getUserInfo/",views.getInfoView.as_view(),name="getUserInfo"),
  path("getAllCase/",views.getAllCaseView.as_view(),name="getAllCase"),
  path("getCaseById/",views.getCaseByIdView.as_view(),name="getCaseById"),
  path("addVinfo/",views.addVinfo,name="addVinfo"),
  path("getAllVirus/",views.getAllVirusView.as_view(),name="getAllVirus"),
  path("addPatientInfo", views.addPatientinfo, name="addPatientInfo"),
  # path("getVirusById/",views.getVirusByIdView.as_view(),name="getVirusById"),
  # path('',views.index,name='index')
]
