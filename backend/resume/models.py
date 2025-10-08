from django.db import models
from django.contrib.auth.models import User

class TitleData(models.Model):
    about = models.TextField()
    title = models.CharField(max_length=255)
    display_name = models.CharField(max_length=255, blank=True)
    
    user = models.OneToOneField(
        User, on_delete=models.CASCADE
    )

    def __str__(self):
        return self.display_name or self.title

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
