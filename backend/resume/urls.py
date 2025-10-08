from django.urls import path
from .views import TitleDataAPIView

urlpatterns = [
    path("title-data/", TitleDataAPIView.as_view(), name="title-data"),
]