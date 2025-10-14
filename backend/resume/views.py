from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from .models import TitleData, Education
from .serializers import TitleDataSerializer, EducationDataSerializer
from django.contrib.auth.models import User


class TitleDataAPIView(APIView):
    # permission_classes = [permissions.IsAuthenticated]
    def get(self, request):
        try:
            user = User.objects.get(id=1)
            title_data = TitleData.objects.get(user=user)
            serializer = TitleDataSerializer(title_data)
            return Response(serializer.data)
        except TitleData.DoesNotExist:
            return Response({"detail": "TitleData not found."}, status=status.HTTP_404_NOT_FOUND)
    def post(self, request):
        if TitleData.objects.filter(user=User.objects.get(id=1)).exists():
            try:
                title_data = TitleData.objects.get(user=User.objects.get(id=1))
            except TitleData.DoesNotExist:
                return Response({"detail": "TitleData not found."}, status=status.HTTP_404_NOT_FOUND)
            serializer = TitleDataSerializer(title_data, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)    
        serializer = TitleDataSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=User.objects.get(id=1))
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class EducationDataAPIView(APIView):
    # permission_classes = [permissions.IsAuthenticated]
    def get(self, request):
        user = User.objects.get(id=1)
        education_data = Education.objects.filter(user=user)
        serializer = EducationDataSerializer(education_data,many=True)
        return Response(serializer.data)
    