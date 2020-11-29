from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinLengthValidator
import uuid

class Geodata(models.Model):
    location_name = models.CharField(max_length=200)
    address = models.TextField()
    Xcoord = models.DecimalField(max_digits=20, decimal_places=10)
    Ycoord = models.DecimalField(max_digits=20, decimal_places=10)

    def __str__(self):
        return self.location_name

class Patient(models.Model):
    patient_name = models.CharField(max_length=200)
    hkid = models.CharField(max_length=10,primary_key=True,default=uuid.uuid1)
    birth_date = models.DateField()

    def __str__(self):
        return self.patient_name

class Virus(models.Model):
    virus_name = models.CharField(max_length=200)
    common_name = models.CharField(max_length=200)
    max_infect_period = models.IntegerField()

    def __str__(self):
        return self.virus_name


class Case(models.Model):
    case_no = models.AutoField(primary_key=True)
    date_confirmed = models.DateField()
    local_or_imported = models.CharField(max_length=10)
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    virus = models.ForeignKey(Virus, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.case_no)


class Visited(models.Model):
    date_from = models.DateField()
    date_to = models.DateField()
    category = models.CharField(max_length=200)
    case_no = models.ForeignKey(Case, on_delete=models.CASCADE)
    geodata = models.ForeignKey(Geodata, on_delete=models.CASCADE)

class Staff(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    staff_num = models.CharField(max_length=7, validators=[MinLengthValidator(7)])
