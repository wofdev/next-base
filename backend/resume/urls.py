from django.urls import path
from .views import ResumeDataAPIView

urlpatterns = [
    path("resume-data/", ResumeDataAPIView.as_view(), name="resume-data"),
]