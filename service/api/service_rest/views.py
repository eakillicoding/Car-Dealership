from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from django.db import IntegrityError
from django.http import JsonResponse, Http404
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
            return JsonResponse(
                    technician,
                    encoder=encoders.TechnicianDetailEncoder,
                    safe=False
                )
        except IntegrityError:
            return JsonResponse(
                {"error": "The employee id is already in use!"},
                status=400,
            )
        except:
            return JsonResponse(
                {"error": "Cannot create technician"},
                status=400,
            )


@require_http_methods(["GET", "DELETE"])
def api_show_technician(request, id):
    try:
        technician = Technician.objects.get(id=id)
    except Technician.DoesNotExist:
        return JsonResponse(
            {"error": "Invalid technician id"},
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


@require_http_methods(["GET", "POST"])
def api_list_appointments(request):
    if request.method == "GET":
        appointments = Appointment.objects.all()
        return JsonResponse(
            {"appointments": appointments},
            encoder=encoders.AppointmentListEncoder
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
                encoder=encoders.AppointmentDetailEncoder,
                safe=False
            )
        except:
            return JsonResponse(
                {"Error": "Cannot create appointment"},
                status=400
            )


@require_http_methods(["GET", "DELETE"])
def api_show_appointment(request, id):
    try:
        appointment = Appointment.objects.get(id=id)
    except Appointment.DoesNotExist:
        return JsonResponse(
            {"error": "Invalid appointment id"},
            status=400
        )
    if request.method == "GET":
        return JsonResponse(
            appointment,
            encoder=encoders.AppointmentDetailEncoder,
            safe=False
        )
    else:
        count, _ = appointment.delete()
        return JsonResponse({"deleted": count > 0})


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
    except Appointment.DoesNotExist:
        return JsonResponse(
            {"error": "Invalid appointment id"},
            status=400
        )
    appointment.status = status
    appointment.save()
    return JsonResponse(
        appointment,
        encoder=encoders.AppointmentDetailEncoder,
        safe=False
    )


@require_http_methods(["GET"])
def api_auto_vo(request):
    autos = AutomobileVO.objects.all()
    return JsonResponse(
        {"auto_vos": autos},
        encoder=encoders.AutomobileVOListEncoder
    )
