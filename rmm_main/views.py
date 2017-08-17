# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import json

from django.http import Http404
from django.shortcuts import render, render_to_response, HttpResponse
from django.template import RequestContext
from django.core.mail import send_mail

from .models import Contact
from .forms import ContactForm


def index(request):
    return render(request, 'rmm_main/index.html', {'contact': ContactForm()})


def contact_submit(request):
    if request.method == 'POST':
        form = ContactForm(request.POST)
        response_msg = "Gracias %s por su solicitud de contacto. En breve nos pondremos en contacto con usted a trevés de la dirección de correo electrónico %s"
        if form.is_valid():
            name = request.POST['name']
            email = request.POST['email']
            message = request.POST['message']

            contact = Contact(name=name, email=email, message=message)
            contact.save()

            send_mail(
                'Contact form web_full',
                'Nombre: ' + name + '\nMensaje: ' + message,
                email,
                ['rafelmm@gmail.com'],
                fail_silently=False,
            )

            response_data = {'errcode': 0,
                             'message': response_msg % (name, email)}

            return HttpResponse(
                json.dumps(response_data),
                content_type="application/json"
            )

    return render_to_response('rmm_main/index.html', {'contact': ContactForm()}, RequestContext(request))
