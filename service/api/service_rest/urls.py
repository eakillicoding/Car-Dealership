from django.urls import path
from service_rest import views

urlpatterns = [
    path("technicians/", views.api_list_technicians, name="api_list_technicians"),
    path("technicians/<int:id>/", views.api_show_technician, name="api_show_technician"),
    path("appointments/", views.api_list_appointments, name="api_list_appointments"),
    path("appointments/<int:id>/", views.api_show_appointment, name="api_show_appointment"),
    path("appointments/<int:id>/<str:status>/", views.api_appointment_status, name="api_appointment_status"),
]
