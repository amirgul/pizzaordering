# Analogous to application.py on flask
import time
from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.shortcuts import render
from django.urls import reverse
from datetime import datetime

from .models import Item, ItemType, ItemSize, Orders, OrderItem
# Create your views here.
def index(request):
    context = {
    "Items": Item.objects.all(),
    "ItemType": ItemType.objects.all(),
    "ItemSize": ItemSize.objects.all(),
    "message": "none"
    }
    return render(request, "orders/index.html", context)

def login_view(request):
    username = request.POST["username"]
    password = request.POST["password"]
    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user)
        context = { "user": request.user }
        return HttpResponseRedirect(reverse("checkout"))
        # return render(request, "orders/checkout.html", context)
    else:
        context = {
        "Items": Item.objects.all(),
        "ItemType": ItemType.objects.all(),
        "ItemSize": ItemSize.objects.all(),
        "message": "invalid_credentials"
        }
        return render(request, "orders/index.html", context)

def checkout_view(request):
    return render(request, "orders/checkout.html")

def logout_view(request):
    logout(request)
    context = {
    "Items": Item.objects.all(),
    "ItemType": ItemType.objects.all(),
    "ItemSize": ItemSize.objects.all(),
    "message": "from_logout"
    }
    return render(request, "orders/index.html", context)

def ajaxres(request):
    # print("DATAPOST: ", request.POST["data"])
    print("\n\n")
    total_price = 0.0

    now = datetime.now()
    anOrder = Orders(username=str(request.user), time=now.strftime('%m/%d/%Y %H:%M'), total=0, ready="false")
    anOrder.save()
    for key_i in request.POST.keys():
        if(key_i != "csrfmiddlewaretoken"):
            price, quantity = request.POST[key_i].split("|")
            anOrdrItem= OrderItem(order=anOrder, itemName=key_i, quantity=int(quantity), price=float(price))
            anOrdrItem.save()
            anOrder.total += float(price)*float(quantity)
            anOrder.save()
    ls = [anOrder.id]
    return JsonResponse({'response': ls})


def orderStatus(request):
    order_id = request.POST['order_id']
    order_status = Orders.objects.get(pk=order_id)
    order_status = order_status.ready
    print(order_id, order_status)
    return JsonResponse({'response': order_status})

def markOrderReady(request):
    order_id = request.POST['order_id']
    anOrder = Orders.objects.get(pk=order_id)
    anOrder.ready = "true"
    anOrder.save()
    print(order_id, anOrder.ready)
    return JsonResponse({'response': anOrder.ready})

def staff(request):
    context = {
    "Orders": Orders.objects.all(),
    "OrderItem": OrderItem.objects.all()
    }
    return render(request, "orders/staff.html", context)
