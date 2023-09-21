from django.http import HttpResponse, JsonResponse
from rest_framework.views import APIView
from _databricks.workflow_run import start, load_list
from _lib.view import resp

mock_data={"id":"xxx"}

class WorkflowRunView(APIView):
        def get(self, request):
            data = load_list(request)
            return resp(data)
        def post(self, request):
            data = start(request.data)
            return resp(data)
        def put(self, request):
          return resp({})