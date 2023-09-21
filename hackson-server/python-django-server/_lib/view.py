from django.http import JsonResponse


def resp(data):
    resp = {"data": data, "code": 0}
    return JsonResponse(resp, safe=False)


def resp_err(message, code=100):
    resp = {"data": {}, "code": code, "message": f'{message}'}
    return JsonResponse(resp, safe=False)
