from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("checkout", views.checkout_view, name="checkout"),
    path("ajaxres", views.ajaxres, name="ajaxres"),
    path("staff", views.staff, name="staff"),
    path("orderStatus", views.orderStatus, name="orderStatus"),
    path("markOrderReady", views.markOrderReady, name="markOrderReady")
]
