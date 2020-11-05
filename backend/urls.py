from django.urls import path, include
from Hotzone import views
from django.views.generic import TemplateView

urlpatterns = [
  path("", TemplateView.as_view(template_name='index.html')),
  path("api/location/<str:searchTerm>",views.locationSearch,name="location"),
  path("api/add/",views.addLocation,name="addLocation")
  # path('',views.index,name='index')
]