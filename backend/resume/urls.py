from django.urls import path
from .views import TitleDataAPIView,EducationDataAPIView

urlpatterns = [
    path("title-data/", TitleDataAPIView.as_view(), name="title-data"),
    path("education-data/", EducationDataAPIView.as_view(), name="education-data"),
]