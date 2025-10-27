from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from django.contrib.auth.models import User
from .serializers import (
    ResumeSerializer,
    TitleSerializer,
    ContactSerializer,
    EducationSerializer,
    WorkSerializer,
    ProjectSerializer,
    CertificationSerializer,
    HobbySerializer,
)
from .models import Title, Contact, Education, Work, Project, Certification, Hobby, SkillCategory, Skill
import json

class ResumeDataAPIView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        """برگرداندن اطلاعات رزومه برای کاربر مشخص (id=1)"""
        try:
            user = User.objects.get(id=1)
            serializer = ResumeSerializer(user)
            return Response(serializer.data)
        except User.DoesNotExist:
            return Response({"detail": "User not found."}, status=status.HTTP_404_NOT_FOUND)

    def post(self, request):
        """ایجاد یا به‌روزرسانی رزومه"""
        try:
            user = User.objects.get(id=1)
        except User.DoesNotExist:
            return Response({"detail": "User not found."}, status=status.HTTP_404_NOT_FOUND)

        # --- Parse JSON fields for multipart ---
        data = request.data.copy()
        json_fields = ["title", "contact", "educations", "works", "projects", "certifications", "hobbies", "skills"]
        for field in json_fields:
            if field in data and isinstance(data[field], str):
                try:
                    data[field] = json.loads(data[field])
                except json.JSONDecodeError:
                    return Response(
                        {field: "Invalid JSON format"},
                        status=status.HTTP_400_BAD_REQUEST
                    )

        if "title" in data:
            title_data = data["title"]

            # اگر فایل ارسال شده
            profile_photo = request.FILES.get("profile_photo")
            if profile_photo:
                title_data["profile_photo"] = profile_photo

            try:
                title_obj = Title.objects.get(user=user)
                title_serializer = TitleSerializer(title_obj, data=title_data, partial=True)
            except Title.DoesNotExist:
                title_serializer = TitleSerializer(data=title_data)

            if title_serializer.is_valid():
                title_serializer.save(user=user)
            else:
                return Response(title_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


        # --- Title ---
        # if "title" in data:
        #     title_data = data["title"]
        #     try:
        #         title_obj = Title.objects.get(user=user)
        #         title_serializer = TitleSerializer(title_obj, data=title_data, partial=True)
        #     except Title.DoesNotExist:
        #         title_serializer = TitleSerializer(data=title_data)

        #     if title_serializer.is_valid():
        #         title_serializer.save(user=user)
        #     else:
        #         return Response(title_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        # --- Contact ---
        if "contact" in data:
            contact_data = data["contact"]
            try:
                contact_obj = Contact.objects.get(user=user)
                contact_serializer = ContactSerializer(contact_obj, data=contact_data, partial=True)
            except Contact.DoesNotExist:
                contact_serializer = ContactSerializer(data=contact_data)

            if contact_serializer.is_valid():
                contact_serializer.save(user=user)
            else:
                return Response(contact_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        # --- Educations ---
        if "educations" in data:
            Education.objects.filter(user=user).delete()
            for edu_data in data["educations"]:
                edu_serializer = EducationSerializer(data=edu_data)
                if edu_serializer.is_valid():
                    edu_serializer.save(user=user)
                else:
                    return Response(edu_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        # --- Works ---
        if "works" in data:
            Work.objects.filter(user=user).delete()
            for work_data in data["works"]:
                work_serializer = WorkSerializer(data=work_data)
                if work_serializer.is_valid():
                    work_serializer.save(user=user)
                else:
                    return Response(work_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        # --- Projects ---
        if "projects" in data:
            Project.objects.filter(user=user).delete()
            for project_data in data["projects"]:
                project_serializer = ProjectSerializer(data=project_data)
                if project_serializer.is_valid():
                    project_serializer.save(user=user)
                else:
                    return Response(project_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        # --- Certifications ---
        if "certifications" in data:
            Certification.objects.filter(user=user).delete()
            for cert_data in data["certifications"]:
                cert_serializer = CertificationSerializer(data=cert_data)
                if cert_serializer.is_valid():
                    cert_serializer.save(user=user)
                else:
                    return Response(cert_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        # --- Hobbies ---
        if "hobbies" in data:
            Hobby.objects.filter(user=user).delete()
            for hobby_data in data["hobbies"]:
                hobby_serializer = HobbySerializer(data=hobby_data)
                if hobby_serializer.is_valid():
                    hobby_serializer.save(user=user)
                else:
                    return Response(hobby_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        # --- Skills ---
        if "skills" in data:
            SkillCategory.objects.filter(user=user).delete()
            for cat_name, skills_list in data["skills"].items():
                category = SkillCategory.objects.create(user=user, name=cat_name)
                for skill_name in skills_list:
                    Skill.objects.create(category=category, name=skill_name)

        # --- Return updated resume ---
        serializer = ResumeSerializer(user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework import status, permissions
# from django.contrib.auth.models import User
# from .serializers import (
#     ResumeSerializer,
#     TitleSerializer,
#     ContactSerializer,
#     EducationSerializer,
#     WorkSerializer,
#     ProjectSerializer,
#     CertificationSerializer,
#     HobbySerializer,
# )
# from .models import Title, Contact, Education, Work, Project, Certification, Hobby, SkillCategory, Skill


# class ResumeDataAPIView(APIView):
#     permission_classes = [permissions.AllowAny]

#     def get(self, request):
#         """برگرداندن اطلاعات رزومه برای کاربر مشخص (مثلاً id=1)"""
#         try:
#             user = User.objects.get(id=1)
#             serializer = ResumeSerializer(user)
#             return Response(serializer.data)
#         except User.DoesNotExist:
#             return Response({"detail": "User not found."}, status=status.HTTP_404_NOT_FOUND)

#     def post(self, request):
#         """ایجاد یا به‌روزرسانی رزومه"""
#         try:
#             user = User.objects.get(id=1)
#         except User.DoesNotExist:
#             return Response({"detail": "User not found."}, status=status.HTTP_404_NOT_FOUND)

#         data = request.data

#         # --- Title ---
#         if "title" in data:
#             title_data = data["title"]
#             try:
#                 title_obj = Title.objects.get(user=user)
#                 title_serializer = TitleSerializer(title_obj, data=title_data, partial=True)
#             except Title.DoesNotExist:
#                 title_serializer = TitleSerializer(data=title_data)

#             if title_serializer.is_valid():
#                 title_serializer.save(user=user)
#             else:
#                 return Response(title_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#         # --- Contact ---
#         if "contact" in data:
#             contact_data = data["contact"]
#             print(contact_data)
#             try:
#                 contact_obj = Contact.objects.get(user=user)
#                 contact_serializer = ContactSerializer(contact_obj, data=contact_data, partial=True)
#             except Contact.DoesNotExist:
#                 contact_serializer = ContactSerializer(data=contact_data)

#             if contact_serializer.is_valid():
#                 contact_serializer.save(user=user)
#                 print("**********************************")
#             else:
#                 return Response(contact_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#         # --- Education ---
#         if "educations" in data:
#             Education.objects.filter(user=user).delete()
#             for edu_data in data["educations"]:
#                 edu_serializer = EducationSerializer(data=edu_data)
#                 if edu_serializer.is_valid():
#                     edu_serializer.save(user=user)
#                 else:
#                     return Response(edu_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#         # --- Work ---
#         if "works" in data:
#             Work.objects.filter(user=user).delete()
#             for work_data in data["works"]:
#                 work_serializer = WorkSerializer(data=work_data)
#                 if work_serializer.is_valid():
#                     work_serializer.save(user=user)
#                 else:
#                     return Response(work_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#         # --- Projects ---
#         if "projects" in data:
#             Project.objects.filter(user=user).delete()
#             for project_data in data["projects"]:
#                 project_serializer = ProjectSerializer(data=project_data)
#                 if project_serializer.is_valid():
#                     project_serializer.save(user=user)
#                 else:
#                     return Response(project_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#         # --- Certifications ---
#         if "certifications" in data:
#             Certification.objects.filter(user=user).delete()
#             for cert_data in data["certifications"]:
#                 cert_serializer = CertificationSerializer(data=cert_data)
#                 if cert_serializer.is_valid():
#                     cert_serializer.save(user=user)
#                 else:
#                     return Response(cert_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#         # --- Hobbies ---
#         if "hobbies" in data:
#             Hobby.objects.filter(user=user).delete()
#             for hobby_data in data["hobbies"]:
#                 hobby_serializer = HobbySerializer(data=hobby_data)
#                 if hobby_serializer.is_valid():
#                     hobby_serializer.save(user=user)
#                 else:
#                     return Response(hobby_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#         # --- Skills ---
#         if "skills" in data:
#             SkillCategory.objects.filter(user=user).delete()
#             for cat_name, skills_list in data["skills"].items():
#                 category = SkillCategory.objects.create(user=user, name=cat_name)
#                 for skill_name in skills_list:
#                     Skill.objects.create(category=category, name=skill_name)

#         # --- Return updated resume ---
#         serializer = ResumeSerializer(user)
#         return Response(serializer.data, status=status.HTTP_201_CREATED)

