from django.contrib import admin

from .models import Item, ItemType, ItemSize, Orders, OrderItem
# Register your models here.

class ItemSizeInline(admin.TabularInline):
    model = ItemSize
class ItemTypeAdmin(admin.ModelAdmin):
    inlines = [ ItemSizeInline, ]


class ItemTypeInline(admin.TabularInline):
    model = ItemType
class ItemAdmin(admin.ModelAdmin):
    inlines = [ ItemTypeInline, ]


class OrderItemInline(admin.TabularInline):
    model = OrderItem
class OrdersAdmin(admin.ModelAdmin):
    inlines = [ OrderItemInline, ]

admin.site.register(Item, ItemAdmin)
admin.site.register(ItemType, ItemTypeAdmin)
# admin.site.register(ItemSize)

admin.site.register(Orders, OrdersAdmin)#, OrdersAdmin)
# admin.site.register(OrderItem)#, OrderItemAdmin)
