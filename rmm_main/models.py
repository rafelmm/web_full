# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

# Create your models here.
class Contact(models.Model):
    name = models.CharField(max_length=200)
    email = models.EmailField()
    message = models.TextField(max_length=2000)
    date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.email + ' ' + self.message
