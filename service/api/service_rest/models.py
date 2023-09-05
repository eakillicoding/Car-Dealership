from django.db import models
from django.urls import reverse


class Technician(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    employee_id = models.PositiveIntegerField(unique=True)

    def get_api_url(self):
        return reverse("api_technician", kwargs={"pk": self.id})


class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, unique=True)
    sold = models.BooleanField()

    def get_api_url(self):
        return reverse("api_automobile_vo", kwargs={"pk": self.id})


class Appointment(models.Model):
    date_time = models.DateTimeField()
    reason = models.TextField()
    status = models.CharField(max_length=10, default="active")
    vin = models.CharField(max_length=17)
    customer = models.CharField(max_length=50)
    technician = models.ForeignKey(
        Technician,
        related_name="appointments",
        on_delete=models.CASCADE,
    )

    def get_api_url(self):
        return reverse("api_appointment", kwargs={"pk": self.id})
