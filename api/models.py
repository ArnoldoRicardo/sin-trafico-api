from django.db import models
from django.utils import timezone


class Vehicle(models.Model):
    owner = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    Placas = models.CharField(max_length=50)
    lat = models.FloatField()
    lon = models.FloatField()
    created_date = models.DateTimeField(
        default=timezone.now)

    def __str__(self):
        return self.Placas
