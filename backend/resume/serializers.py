from rest_framework import serializers
from .models import TitleData

class TitleDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = TitleData
        fields =  ["id", "about", "title", "display_name"]
        