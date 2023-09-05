from django.urls import path
from service_rest import views


urlpatterns = [
    path(
        "technicians/",
        views.api_list_technicians,
        name="api_list_technicians")
]
