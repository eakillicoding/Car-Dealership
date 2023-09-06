from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from django.db import IntegrityError
from django.http import JsonResponse
import json

from .models import Technician, AutomobileVO, Appointment
from service_rest import encoders


@require_http_methods(["GET", "POST"])
def api_list_technicians(request):
    if request.method == "GET":
        technicians = Technician.objects.all()
        return JsonResponse(
            {"technicians": technicians},
            encoder=encoders.TechnicianListEncoder
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
            encoder=encoders.TechnicianDetailEncoder,
            safe=False
        )


@require_http_methods(["GET", "DELETE"])
def api_show_technician(request, id):
    try:
        technician = Technician.objects.get(id=id)
    except Technician.DoesNotExist:
        return JsonResponse(
            {"message": "no technician exists for that id"},
            status=400
        )
    if request.method == "GET":
        return JsonResponse(
            technician,
            encoder=encoders.TechnicianDetailEncoder,
            safe=False
        )
    else:
        count, _ = technician.delete()
        return JsonResponse({"deleted": count > 0})
