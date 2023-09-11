from django.views.decorators.http import require_http_methods
from django.db import IntegrityError
from django.http import JsonResponse, Http404
import json

from .models import Technician, Appointment
from service_rest import encoders


@require_http_methods(["GET", "POST"])
def api_list_technicians(request):
    if request.method == "GET":
        technicians = Technician.objects.all()
        return JsonResponse(
            {"technicians": technicians},
            encoder=encoders.TechnicianEncoder
        )
    else:
        content = json.loads(request.body)
        try:
            content["first_name"] = content["first_name"].capitalize()
            content["last_name"] = content["last_name"].capitalize()
            technician = Technician.objects.create(**content)
            return JsonResponse(
                    technician,
                    encoder=encoders.TechnicianEncoder,
                    safe=False
                )
        except IntegrityError:
            return JsonResponse(
                {"error": "The employee id is already in use!"},
                status=400,
            )
        except Exception as e:
            return JsonResponse(
                {"error": f"{e}"},
                status=400,
            )


@require_http_methods(["GET", "DELETE"])
def api_show_technician(request, id):
    try:
        technician = Technician.objects.get(id=id)
        if request.method == "GET":
            return JsonResponse(
                technician,
                encoder=encoders.TechnicianEncoder,
                safe=False
            )
        else:
            count, _ = technician.delete()
            return JsonResponse({"deleted": count > 0})
    except Technician.DoesNotExist:
        return JsonResponse(
            {"error": "Invalid technician id"},
            status=400
        )


@require_http_methods(["GET", "POST"])
def api_list_appointments(request):
    if request.method == "GET":
        appointments = Appointment.objects.all()
        return JsonResponse(
            {"appointments": appointments},
            encoder=encoders.AppointmentEncoder
        )
    else:
        content = json.loads(request.body)
        try:
            content["technician"] = Technician.objects.get(id=content["technician"])
        except Technician.DoesNotExist:
            return JsonResponse(
                {"error": "Invalid technician id"},
                status=400
            )
        try:
            appointment = Appointment.objects.create(**content)
            return JsonResponse(
                appointment,
                encoder=encoders.AppointmentEncoder,
                safe=False
            )
        except Exception as e:
            return JsonResponse(
                {"Error": f"{e}"},
                status=400
            )


@require_http_methods(["GET", "DELETE"])
def api_show_appointment(request, id):
    try:
        appointment = Appointment.objects.get(id=id)
        if request.method == "GET":
            return JsonResponse(
                appointment,
                encoder=encoders.AppointmentEncoder,
                safe=False
            )
        else:
            count, _ = appointment.delete()
            return JsonResponse({"deleted": count > 0})
    except Appointment.DoesNotExist:
        return JsonResponse(
            {"error": "Invalid appointment id"},
            status=400
        )


@require_http_methods(["PUT"])
def api_appointment_status(request, id, status):
    if status == 'cancel':
        status = 'canceled'
    elif status == 'finish':
        status = 'finished'
    else:
        raise Http404()

    try:
        appointment = Appointment.objects.get(id=id)
        appointment.status = status
        appointment.save()
        return JsonResponse(
            appointment,
            encoder=encoders.AppointmentEncoder,
            safe=False
        )
    except Appointment.DoesNotExist:
        return JsonResponse(
            {"error": "Invalid appointment id"},
            status=400
        )
