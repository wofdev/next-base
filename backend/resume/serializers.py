from rest_framework import serializers
from .models import TitleData, Education

class TitleDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = TitleData
        fields =  ["id", "about", "title", "display_name"]

class EducationDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        fields = "__all__"
        