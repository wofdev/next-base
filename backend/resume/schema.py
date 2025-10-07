import graphene
from graphene_django import DjangoObjectType
from . models import Resume, TitleData, Education

class TitleDataType(DjangoObjectType):
    class Meta:
        model = TitleData
        fields = "__all__"
        

class EducationType(DjangoObjectType):
    class Meta:
        model = Education
        fields = "__all__"


class ResumeType(DjangoObjectType):
    class Meta:
        model = Resume
        fields = "__all__"


# ---------- Queries ----------

class Query(graphene.ObjectType):
    all_resumes = graphene.List(ResumeType)
    resume = graphene.Field(ResumeType, id=graphene.Int(required=True))

    def resolve_all_resumes(root, info):
        return Resume.objects.all()

    def resolve_resume(root, info, id):
        return Resume.objects.get(pk=id)


# ---------- Mutations ----------

class CreateTitleData(graphene.Mutation):
    class Arguments:
        about = graphene.String(required=True)
        title = graphene.String(required=True)
        display_name = graphene.String(required=False)

    title_data = graphene.Field(TitleDataType)

    def mutate(self, info, about, title, display_name=None):
        td = TitleData.objects.create(
            about=about, title=title, display_name=display_name or ""
        )
        return CreateTitleData(title_data=td)


class CreateResume(graphene.Mutation):
    class Arguments:
        title_data_id = graphene.Int(required=True)

    resume = graphene.Field(ResumeType)

    def mutate(self, info, title_data_id):
        title_data = TitleData.objects.get(pk=title_data_id)
        resume = Resume.objects.create(title_data=title_data)
        return CreateResume(resume=resume)


class AddEducation(graphene.Mutation):
    class Arguments:
        resume_id = graphene.Int(required=True)
        from_date = graphene.Date(required=True)
        to_date = graphene.Date(required=True)
        title = graphene.String(required=True)
        description = graphene.String(required=True)

    education = graphene.Field(EducationType)

    def mutate(self, info, resume_id, from_date, to_date, title, description):
        resume = Resume.objects.get(pk=resume_id)
        edu = Education.objects.create(
            resume=resume,
            from_date=from_date,
            to_date=to_date,
            title=title,
            description=description,
        )
        return AddEducation(education=edu)

class UpdateEducation(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)            # شناسه آموزش مورد نظر
        title = graphene.String(required=False)
        description = graphene.String(required=False)
        from_date = graphene.Date(required=False)
        to_date = graphene.Date(required=False)

    education = graphene.Field(EducationType)

    def mutate(self, info, id, title=None, description=None, from_date=None, to_date=None):
        try:
            education = Education.objects.get(pk=id)
        except Education.DoesNotExist:
            raise Exception("Education not found")

        if title is not None:
            education.title = title
        if description is not None:
            education.description = description
        if from_date is not None:
            education.from_date = from_date
        if to_date is not None:
            education.to_date = to_date

        education.save()
        return UpdateEducation(education=education)


class Mutation(graphene.ObjectType):
    create_title_data = CreateTitleData.Field()
    create_resume = CreateResume.Field()
    add_education = AddEducation.Field()
    update_education = UpdateEducation.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)