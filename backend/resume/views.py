from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from .models import Title, Education
from .serializers import ResumeSerializer
from django.contrib.auth.models import User


class ResumeDataAPIView(APIView):
    def get(self, request):
        try:
            user = User.objects.get(id=1)
            serializer = ResumeSerializer(user)
            return Response(serializer.data)
        except User.DoesNotExist:
            return Response({"detail": "User not found."}, status=status.HTTP_404_NOT_FOUND)