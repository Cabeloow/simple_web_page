import smtplib
import email.message
from os import environ

def enviar_email(corpo_email, email_para, assunto):  

    msg = email.message.Message()
    msg['Subject'] = assunto
    msg['From'] = 'marmoraria_2022@hotmail.com'
    msg['To'] = email_para # Substituir por parametro
    password = 'Marmore_eh.bom2022'
    msg.add_header('Content-Type', 'text/html')
    msg.set_payload(corpo_email )

    s = smtplib.SMTP('smtp-mail.outlook.com: 587')
    s.starttls()
    # Login Credentials for sending the mail
    s.login(msg['From'], password)
    s.sendmail(msg['From'], [msg['To']], msg.as_string().encode('utf-8'))
