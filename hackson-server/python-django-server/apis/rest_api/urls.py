from .import views,workflow_run_views
from django.urls import path

urlpatterns = [
        path("workflow/run", workflow_run_views.WorkflowRunView.as_view()),
        # path("chat/", views.ChatModalView.as_view()),
        # path("runquery/", views.RunQueryView.as_view()),
        path("workflow/", views.WorkflowView.as_view()),
        path("workflow/deploy/", views.WorkflowDeployView.as_view())
]