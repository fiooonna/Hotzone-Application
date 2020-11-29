from django.urls import include, path
from rest_framework import routers
from . import views


urlpatterns = [
  path("searchLocation/",views.locationSearch,name="location"),
  path("signin/",views.signin,name="login"),
  path("signout/",views.signoutView.as_view(),name="signout"),
  path("getUserInfo/",views.getInfoView.as_view(),name="getUserInfo"),
  path("getAllCase/",views.getAllCaseView.as_view(),name="getAllCase"),
  path("getCaseById/",views.getCaseByIdView.as_view(),name="getCaseById"),
  path("addVinfo/",views.addVinfo,name="addVinfo"),
  path("getAllVirus/",views.getAllVirusView.as_view(),name="getAllVirus"),
  path("getPatientInfo/",views.getPatientInfo.as_view(),name="getPatientInfo"),
  path("addPatientinfo/", views.addPatientinfo, name="addPatientinfo"),
  path("submitCase/", views.submitCase,name="submitCase"),
  path("findCluster/",views.findCluster,name="findCluster"),
  # path("getVirusById/",views.getVirusByIdView.as_view(),name="getVirusById"),
  # path('',views.index,name='index')
]
