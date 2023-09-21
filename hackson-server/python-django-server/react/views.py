from django.shortcuts import render

# Create your views here.
def react(request):
    return render(request, "index.html")