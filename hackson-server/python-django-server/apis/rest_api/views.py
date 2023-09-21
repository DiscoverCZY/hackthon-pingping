from rest_framework.views import APIView

from _databricks.workflow import deploy, create
from _lib.view import resp_err, resp


# Create your views here.

class WorkflowView(APIView):

    def post(self, request):
        try:
            if request.data is None or len(request.data) == 0:
                return resp_err('payload is required')
            create(request.data['name'], request.data['cluster_id'])
            return resp('workflow has been created')
        except Exception as ex:
            return resp_err(ex)


class WorkflowDeployView(APIView):

    def post(self, request):
        try:
            if request.data is None or len(request.data) == 0:
                return resp_err('payload is required')
            deploy(request.data['workflow_id'])
            return resp('workflow has been deployed')
        except Exception as ex:
            return resp_err(ex)
