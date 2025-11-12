from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from django.contrib.auth.models import User
from django.db import transaction
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
import json
from io import BytesIO
from PIL import Image

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

class ResumeDataAPIView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        try:
            user = User.objects.get(id=1)
            serializer = ResumeSerializer(user)
            return Response(serializer.data)
        except User.DoesNotExist:
            return Response({"detail": "User not found."}, status=status.HTTP_404_NOT_FOUND)

    def post(self, request):
        try:
            user = User.objects.get(id=1)
        except User.DoesNotExist:
            return Response({"detail": "User not found."}, status=status.HTTP_404_NOT_FOUND)

        data = request.data.copy()  # QueryDict -> mutable copy

        # JSON fields
        json_fields = ["title", "contact", "educations", "works", "projects", "certifications", "hobbies", "skills"]
        for field in json_fields:
            if field in data and isinstance(data[field], str):
                try:
                    data[field] = json.loads(data[field])
                except json.JSONDecodeError:
                    return Response({field: "Invalid JSON format"}, status=status.HTTP_400_BAD_REQUEST)

        # remove_photo flag
        remove_photo_flag = data.get("remove_photo") == "true"

        # new profile photo
        new_profile_photo = request.FILES.get("profile_photo")

        # Resize & compress using Pillow >=10
        if new_profile_photo:
            img = Image.open(new_profile_photo)
            if img.mode in ("RGBA", "P"):
                img = img.convert("RGB")
            # Resize to max 500x500 while keeping aspect ratio
            img.thumbnail((500, 500), Image.Resampling.LANCZOS)
            img_io = BytesIO()
            img.save(img_io, format="JPEG", quality=85)
            new_profile_photo = ContentFile(img_io.getvalue(), name=new_profile_photo.name)

        with transaction.atomic():
            # ---------------- Title ----------------
            if "title" in data:
                title_data = data["title"] or {}
                if new_profile_photo:
                    title_data["profile_photo"] = new_profile_photo

                try:
                    title_obj = Title.objects.get(user=user)
                    if remove_photo_flag or new_profile_photo:
                        old_file = getattr(title_obj, "profile_photo", None)
                        if old_file and old_file.name:
                            try:
                                if default_storage.exists(old_file.name):
                                    default_storage.delete(old_file.name)
                            except Exception:
                                pass
                        title_obj.profile_photo = None
                        title_obj.save(update_fields=["profile_photo"])

                    title_serializer = TitleSerializer(title_obj, data=title_data, partial=True)
                except Title.DoesNotExist:
                    title_serializer = TitleSerializer(data=title_data)

                if title_serializer.is_valid():
                    title_serializer.save(user=user)
                else:
                    return Response(title_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            # ---------------- Contact ----------------
            if "contact" in data:
                contact_data = data["contact"] or {}
                try:
                    contact_obj = Contact.objects.get(user=user)
                    contact_serializer = ContactSerializer(contact_obj, data=contact_data, partial=True)
                except Contact.DoesNotExist:
                    contact_serializer = ContactSerializer(data=contact_data)

                if contact_serializer.is_valid():
                    contact_serializer.save(user=user)
                else:
                    return Response(contact_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            # ---------------- Collections ----------------
            if "educations" in data:
                Education.objects.filter(user=user).delete()
                for edu_data in data["educations"] or []:
                    edu_serializer = EducationSerializer(data=edu_data)
                    if edu_serializer.is_valid():
                        edu_serializer.save(user=user)
                    else:
                        return Response(edu_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            if "works" in data:
                Work.objects.filter(user=user).delete()
                for work_data in data["works"] or []:
                    work_serializer = WorkSerializer(data=work_data)
                    if work_serializer.is_valid():
                        work_serializer.save(user=user)
                    else:
                        return Response(work_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            if "projects" in data:
                Project.objects.filter(user=user).delete()
                for project_data in data["projects"] or []:
                    project_serializer = ProjectSerializer(data=project_data)
                    if project_serializer.is_valid():
                        project_serializer.save(user=user)
                    else:
                        return Response(project_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            if "certifications" in data:
                Certification.objects.filter(user=user).delete()
                for cert_data in data["certifications"] or []:
                    cert_serializer = CertificationSerializer(data=cert_data)
                    if cert_serializer.is_valid():
                        cert_serializer.save(user=user)
                    else:
                        return Response(cert_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            if "hobbies" in data:
                Hobby.objects.filter(user=user).delete()
                for hobby_data in data["hobbies"] or []:
                    hobby_serializer = HobbySerializer(data=hobby_data)
                    if hobby_serializer.is_valid():
                        hobby_serializer.save(user=user)
                    else:
                        return Response(hobby_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            # ---------------- Skills ----------------
            if "skills" in data:
                SkillCategory.objects.filter(user=user).delete()
                for cat_name, skills_list in (data["skills"] or {}).items():
                    category = SkillCategory.objects.create(user=user, name=cat_name)
                    for skill_name in skills_list:
                        Skill.objects.create(category=category, name=skill_name)

            # Return updated resume
            serializer = ResumeSerializer(user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)


# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework import status, permissions
# from django.contrib.auth.models import User
# from django.db import transaction
# from django.core.files.storage import default_storage
# import json
# from PIL import Image
# from io import BytesIO
# from django.core.files.base import ContentFile

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
#         try:
#             user = User.objects.get(id=1)
#             serializer = ResumeSerializer(user)
#             return Response(serializer.data)
#         except User.DoesNotExist:
#             return Response({"detail": "User not found."}, status=status.HTTP_404_NOT_FOUND)

#     def post(self, request):
#         """
#         ایجاد یا به‌روزرسانی رزومه.
#         پشتیبانی از:
#           - multipart/form-data با فیلد profile_photo (فایل)
#           - فیلد remove_photo = "true" (رشته) برای حذف عکس فعلی
#           - سایر فیلدها به‌صورت رشته JSON (title, contact, ...)
#         """
#         try:
#             user = User.objects.get(id=1)
#         except User.DoesNotExist:
#             return Response({"detail": "User not found."}, status=status.HTTP_404_NOT_FOUND)

#         data = request.data.copy()  # QueryDict -> mutable copy

#         # فیلدهایی که JSON هستند و باید لود شوند
#         json_fields = ["title", "contact", "educations", "works", "projects", "certifications", "hobbies", "skills"]
#         for field in json_fields:
#             if field in data and isinstance(data[field], str):
#                 try:
#                     data[field] = json.loads(data[field])
#                 except json.JSONDecodeError:
#                     return Response({field: "Invalid JSON format"}, status=status.HTTP_400_BAD_REQUEST)

#         # پرچم حذف عکس از فرانت (string)
#         remove_photo_flag = data.get("remove_photo") == "true"

#         # فایل جدید (اگر وجود داشته باشد)
#         new_profile_photo = request.FILES.get("profile_photo")

#         # عملیات DB را در یک تراکنش اجرا کنیم تا حالت نیمه‌کاره نداشته باشیم
#         with transaction.atomic():
#             # ---------------- Title ----------------
#             if "title" in data:
#                 title_data = data["title"] or {}

#                 # اگر فایل جدید آمده آن را به title_data اضافه کن
#                 if new_profile_photo:
#                     title_data["profile_photo"] = new_profile_photo

#                 # تلاش برای گرفتن شیء موجود Title
#                 try:
#                     title_obj = Title.objects.get(user=user)
#                     # اگر فرانت خواسته عکس قبلی پاک شود یا فایل جدید آپلود شده:
#                     if remove_photo_flag or new_profile_photo:
#                         # حذف فیزیکی فایل قبلی (اگر وجود داشته باشد)
#                         old_file = getattr(title_obj, "profile_photo", None)
#                         if old_file and old_file.name:
#                             try:
#                                 if default_storage.exists(old_file.name):
#                                     default_storage.delete(old_file.name)
#                             except Exception:
#                                 # نگذار خطا حذف مانع ادامه ذخیره شود؛ می‌توان لاگ کرد
#                                 pass
#                         # مقدار فیلد در مدل را پاک کن (تا بعد از serializer.save مقدار جدید اعمال شود یا null بماند)
#                         title_obj.profile_photo = None
#                         title_obj.save(update_fields=["profile_photo"])

#                     # اکنون serializer را با instance بروزرسانی کن
#                     title_serializer = TitleSerializer(title_obj, data=title_data, partial=True)
#                 except Title.DoesNotExist:
#                     # اگر شیء وجود نداشت و remove_photo فرستاده شد نادیده می‌گیریم
#                     title_serializer = TitleSerializer(data=title_data)

#                 if title_serializer.is_valid():
#                     # save with user relationship (در serializer باید user را نادیده نگیرد یا در save مدیریت شود)
#                     title_serializer.save(user=user)
#                 else:
#                     return Response(title_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#             # ---------------- Contact ----------------
#             if "contact" in data:
#                 contact_data = data["contact"] or {}
#                 try:
#                     contact_obj = Contact.objects.get(user=user)
#                     contact_serializer = ContactSerializer(contact_obj, data=contact_data, partial=True)
#                 except Contact.DoesNotExist:
#                     contact_serializer = ContactSerializer(data=contact_data)

#                 if contact_serializer.is_valid():
#                     contact_serializer.save(user=user)
#                 else:
#                     return Response(contact_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#             # ---------------- Collections: replace existing ----------------
#             if "educations" in data:
#                 Education.objects.filter(user=user).delete()
#                 for edu_data in data["educations"] or []:
#                     edu_serializer = EducationSerializer(data=edu_data)
#                     if edu_serializer.is_valid():
#                         edu_serializer.save(user=user)
#                     else:
#                         return Response(edu_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#             if "works" in data:
#                 Work.objects.filter(user=user).delete()
#                 for work_data in data["works"] or []:
#                     work_serializer = WorkSerializer(data=work_data)
#                     if work_serializer.is_valid():
#                         work_serializer.save(user=user)
#                     else:
#                         return Response(work_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#             if "projects" in data:
#                 Project.objects.filter(user=user).delete()
#                 for project_data in data["projects"] or []:
#                     project_serializer = ProjectSerializer(data=project_data)
#                     if project_serializer.is_valid():
#                         project_serializer.save(user=user)
#                     else:
#                         return Response(project_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#             if "certifications" in data:
#                 Certification.objects.filter(user=user).delete()
#                 for cert_data in data["certifications"] or []:
#                     cert_serializer = CertificationSerializer(data=cert_data)
#                     if cert_serializer.is_valid():
#                         cert_serializer.save(user=user)
#                     else:
#                         return Response(cert_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#             if "hobbies" in data:
#                 Hobby.objects.filter(user=user).delete()
#                 for hobby_data in data["hobbies"] or []:
#                     hobby_serializer = HobbySerializer(data=hobby_data)
#                     if hobby_serializer.is_valid():
#                         hobby_serializer.save(user=user)
#                     else:
#                         return Response(hobby_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#             # ---------------- Skills ----------------
#             if "skills" in data:
#                 SkillCategory.objects.filter(user=user).delete()
#                 for cat_name, skills_list in (data["skills"] or {}).items():
#                     category = SkillCategory.objects.create(user=user, name=cat_name)
#                     for skill_name in skills_list:
#                         Skill.objects.create(category=category, name=skill_name)

#             # پس از اعمال همه تغییرات، بازگرداندن داده‌ی به‌روز شده
#             serializer = ResumeSerializer(user)
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
