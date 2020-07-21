from django.db import models

# Create your models here.
class Item(models.Model):
    name = models.CharField(max_length=20)
    def __str__(self):
        return f"{self.name}"

class ItemType(models.Model):
    itemName = models.ForeignKey(Item, on_delete=models.CASCADE)
    typeName = models.CharField(max_length=20)
    def __str__(self):
        return f"{self.itemName}, {self.typeName}"

class ItemSize(models.Model):
    typeName = models.ForeignKey(ItemType, on_delete=models.CASCADE)
    size = models.CharField(max_length=20)
    price = models.DecimalField(max_digits=6, decimal_places=2)
    def __str__(self):
        return f"{{ \"longname\":\"{self.typeName}, {self.size}\",\"price\":{self.price} }}"

class Orders(models.Model):
    username = models.CharField(max_length=20)
    time = models.CharField(max_length=20)
    total = models.DecimalField(max_digits=6, decimal_places=2)
    ready = models.CharField(max_length=10, default="false")
    def __str__(self):
        return f"{self.username},{self.time}, {self.total}, {self.ready}"

class OrderItem(models.Model):
    order = models.ForeignKey(Orders, on_delete=models.CASCADE)
    itemName = models.CharField(max_length=20)
    quantity = models.IntegerField()
    price = models.DecimalField(max_digits=6, decimal_places=2)
    def __str__(self):
        return f"{self.order}, {self.itemName},{self.quantity}, {self.price}"
