from django.contrib import admin
from .models import*
# Register your models here.
admin.site.register(Geodata)
admin.site.register(Case)
admin.site.register(Virus)
admin.site.register(Patient)
admin.site.register(Visited)
admin.site.register(Staff)