# Generated by Django 2.0.3 on 2020-06-08 00:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='orders',
            name='ready',
            field=models.CharField(default='false', max_length=10),
        ),
    ]
