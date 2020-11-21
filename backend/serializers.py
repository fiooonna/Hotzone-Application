from rest_framework import serializers
from .models import *

class CaseSerializer(serializers.ModelSerializer):
  class Meta:
    model = Case
    fields = "__all__"

class VirusSerializer(serializers.ModelSerializer):
  class Meta:
    model = Virus
    fields = "__all__"
