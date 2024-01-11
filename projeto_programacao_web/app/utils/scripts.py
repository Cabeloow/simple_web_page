import jwt

def gera_passe_random():
    from random import choice
    import string

    tamanho = 8
    valores = string.ascii_lowercase + string.digits
    passe = ''
    for i in range(tamanho):
        passe += choice(valores)

    return(passe)

def encode(passe):
    passe_encoded = jwt.encode({"passe": passe}, "secret", algorithm="HS256")
    return passe_encoded

def decode(passe):
    passe_decoded = jwt.decode(passe, "secret", algorithms=["HS256"])
    return passe_decoded