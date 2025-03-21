from django.contrib import admin

# Register your models here.
from django.db import models

class MyModel(models.Model):
    image = models.ImageField(upload_to='uploads/')
