from common.json import ModelEncoder
from .models import Technician, Appointment, AutomobileVO
from datetime import datetime


class TechnicianEncoder(ModelEncoder):
    model = Technician
    properties = [
        "first_name",
        "last_name",
        "employee_id",
        "id"
    ]


class AppointmentEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "date_time",
        "reason",
        "status",
        "vin",
        "customer",
        "technician",
        "id"
    ]
    encoders = {
        "technician": TechnicianEncoder(),
    }

    def get_extra_data(self, o):
        date_obj = datetime.fromisoformat(str(o.date_time))

        if o.vin in [auto.vin for auto in AutomobileVO.objects.all()]:
            vip = "Yes"
        else:
            vip = "No"

        return {
            "date": date_obj.strftime("%m/%d/%Y").lstrip('0'),
            "time": date_obj.strftime("%I:%M %p").lstrip('0'),
            "vip": vip
        }


class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "vin",
        "sold"
    ]
