from rest_framework import serializers
from .models import *

class CaseSerializer(serializers.ModelSerializer):
  class Meta:
    model = Case
    fields = "__all__"

class PatientSerializer(serializers.ModelSerializer):
  class Meta:
    model = Patient
    fields = "__all__"

class VirusSerializer(serializers.ModelSerializer):
  class Meta:
    model = Virus
    fields = "__all__"

class GeodataSerializer(serializers.ModelSerializer):
  class Meta:
    model = Geodata
    fields = "__all__"

class VisitedSerializer(serializers.ModelSerializer):
  class Meta:
    model = Visited
    fields = "__all__"
