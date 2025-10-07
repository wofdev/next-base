from django.db import models

class TitleData(models.Model):
    about = models.TextField()
    title = models.CharField(max_length=255)
    display_name = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return self.display_name or self.title


class Resume(models.Model):
    title_data = models.OneToOneField(
        TitleData, on_delete=models.CASCADE, related_name="resume"
    )

    def __str__(self):
        return f"Resume for {self.title_data.display_name or 'Unnamed'}"


class Education(models.Model):
    resume = models.ForeignKey(
        Resume, on_delete=models.CASCADE, related_name="educations"
    )
    from_date = models.DateField()
    to_date = models.DateField()
    title = models.CharField(max_length=500)
    description = models.TextField()

    def __str__(self):
        return f"{self.title} ({self.from_date} - {self.to_date})"
