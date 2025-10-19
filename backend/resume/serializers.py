from rest_framework import serializers
from .models import Title, Contact ,Education, Work,Project ,Certification,Hobby,Skill, SkillCategory
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

class WorkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Work
        fields = "__all__"

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = "__all__"

class CertificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Certification
        fields = "__all__"

class HobbySerializer(serializers.ModelSerializer):
    class Meta:
        model = Hobby
        fields = "__all__"

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ["name"]

class SkillCategorySerializer(serializers.ModelSerializer):
    skills = SkillSerializer(many=True)

    class Meta:
        model = SkillCategory
        fields = ["name", "skills"]

class ResumeSerializer(serializers.ModelSerializer):

    title = TitleSerializer()
    contact = ContactSerializer()
    educations = EducationSerializer(many=True)
    works = WorkSerializer(many=True)
    projects = ProjectSerializer(many=True)
    certifications = CertificationSerializer(many=True)
    hobbies = HobbySerializer(many=True)
    skills = serializers.SerializerMethodField()

    def get_skills(self, obj):
        user = obj  # فرض کن obj همون User باشه
        categories = user.skill_categories.all()
        data = {}
        for cat in categories:
            data[cat.name] = [skill.name for skill in cat.skills.all()]
        return data

    class Meta:
        model = User
        fields = [
            "username",
            "title",
            "contact",
            "educations",
            "works",
            "projects",
            "certifications",
            "hobbies",
            "skills",
        ]
        