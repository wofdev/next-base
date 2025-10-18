from rest_framework import serializers
from .models import Title, Contact ,Education
from django.contrib.auth.models import User

class TitleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Title
        fields = "__all__"

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = "__all__"

class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        fields = "__all__"

class ResumeSerializer(serializers.ModelSerializer):

    title = TitleSerializer()
    contact = ContactSerializer()
    educations = EducationSerializer(many=True)

    class Meta:
        model = User
        fields = ["username", "title", "contact", "educations"]
        