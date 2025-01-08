from django.shortcuts import render
from django.views import View
import json
from django.http import JsonResponse
from django.contrib.auth.models import User
from validate_email import validate_email
from django.contrib import messages
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

class EmailValidation(View):
    def post(self,request):
        data=json.loads(request.body)
        email=data['email']
        if not validate_email(email):
            return JsonResponse({'email_error':'Email is invalid'},status=400)
        
        if User.objects.filter(email=email).exists():
            return JsonResponse({'email_error':'Sorry email in use, use another one'},status=409)

        return JsonResponse({'email_valid': True})


class RegistrationView(View):
    def get(self,request):
        return render(request,'authentication/register.html')

    def post(self,request):


        messages.success(request,'Success message')
        messages.error(request,'Error message')
        messages.info(request,'Info message')
        messages.warning(request,'Warning message')

        return render(request,'authentication/register.html')

