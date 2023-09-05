from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from django.db import IntegrityError
from django.http import JsonResponse
import json
from .models import Technician, AutomobileVO, Appointment
from .encoders import TechnicianDetailEncoder, TechnicianListEncoder


@require_http_methods(["GET", "POST"])
def api_list_technicians(request):
    if request.method == "GET":
        technicians = Technician.objects.all()

        return JsonResponse(
            {"technicians": technicians},
            encoder=TechnicianListEncoder
        )
    else:
        content = json.loads(request.body)

        try:
            technician = Technician.objects.create(**content)
        except IntegrityError:
            return JsonResponse(
                {"message": "The employee id is already in use!"},
                status=400,
            )

        return JsonResponse(
            technician,
            encoder=TechnicianDetailEncoder,
            safe=False
        )
