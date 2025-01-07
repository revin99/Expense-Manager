from django.shortcuts import render
from django.views import View
import json
from django.http import JsonResponse
from django.contrib.auth.models import User
# Create your views here.


class UserNameValidation(View):
    def post(self,request):
        data=json.loads(request.body)
        username=data['username']
        if not str(username).isalnum():
            return JsonResponse({'Username_Error':'Username should only contain alphanumeric characters'},status=400)
        
        if User.objects.filter(username=username).exists():
            return JsonResponse({'Username_Error':'Sorry username in use, use another one'},status=409)

        return JsonResponse({'username_valid': True})


class RegistrationView(View):
    def get(self,request):
        return render(request,'authentication/register.html')
