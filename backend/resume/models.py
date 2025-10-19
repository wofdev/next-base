from django.db import models
from django.contrib.auth.models import User
class Title(models.Model):
    about = models.TextField()
    title = models.CharField(max_length=255)
    display_name = models.CharField(max_length=255, blank=True)
    user = models.OneToOneField(
        User, on_delete=models.CASCADE
    )
    def __str__(self):
        return self.display_name or self.title
class Contact(models.Model):
    phone = models.CharField(max_length=11)
    email = models.CharField(max_length=255)
    website = models.CharField(max_length=255)
    github = models.CharField(max_length=255)
    linkedin = models.CharField(max_length=255)
    twitter = models.CharField(max_length=255)
    instagram = models.CharField(max_length=255)
    user = models.OneToOneField(
        User, on_delete=models.CASCADE
    )
    def __str__(self):
        return self.phone
class Education(models.Model):
    from_date = models.DateField()
    to_date = models.DateField()
    title = models.CharField(max_length=500)
    description = models.TextField()
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="educations"
    )
    def __str__(self):
        return f"{self.title} ({self.from_date} - {self.to_date})"
class Work(models.Model):
    from_date = models.DateField()
    to_date = models.DateField()
    title = models.CharField(max_length=500)
    description = models.TextField()
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="works"
    )
    def __str__(self):
        return f"{self.title} ({self.from_date} - {self.to_date})"
class Project(models.Model):
    from_date = models.DateField()
    to_date = models.DateField()
    title = models.CharField(max_length=500)
    description = models.TextField()
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="projects"
    )
    def __str__(self):
        return f"{self.title} ({self.from_date} - {self.to_date})"
class Certification(models.Model):
    from_date = models.DateField()
    to_date = models.DateField()
    title = models.CharField(max_length=500)
    description = models.TextField()
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="certifications"
    )
    def __str__(self):
        return f"{self.title} ({self.from_date} - {self.to_date})"
class Hobby(models.Model):
    title = models.CharField(max_length=500)
    description = models.TextField()
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="hobbies"
    )
    def __str__(self):
        return f"{self.title}"

class SkillCategory(models.Model):
    name = models.CharField(max_length=100)  # frontend, backend, devops , ...
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="skill_categories"
    )

    def __str__(self):
        return self.name

class Skill(models.Model):
    name = models.CharField(max_length=100)  # مثل React, Django, AWS
    category = models.ForeignKey(
        SkillCategory, on_delete=models.CASCADE, related_name="skills"
    )

    def __str__(self):
        return self.name