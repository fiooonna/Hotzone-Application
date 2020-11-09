from django.urls import include, path
from rest_framework import routers
from . import views


urlpatterns = [
  path("location/<str:searchTerm>",views.locationSearch,name="location"),
  path("add/",views.addLocation,name="addLocation"),
  path("signin/",views.signin,name="login"),
  path("signout/",views.signoutView.as_view(),name="signout"),
  path("getUserInfo/",views.getInfoView.as_view(),name="getUserInfo")
  # path('',views.index,name='index')
]
