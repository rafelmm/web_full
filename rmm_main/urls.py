# -*- coding: utf-8 -*-
from django.conf.urls import url

from . import views

app_name = 'rmm_main'
urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^contact$', views.contact_submit, name='contact_submit')
]
