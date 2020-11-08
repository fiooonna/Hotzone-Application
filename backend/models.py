from django.db import models

# Create your models here.
class VisitedLocation(models.Model):
    location = models.CharField(max_length=200)
    address = models.CharField(max_length=400)
    xcoord = models.CharField(max_length=6)
    ycoord = models.CharField(max_length=6)