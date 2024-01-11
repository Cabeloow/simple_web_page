from . import root_routes
from flask import render_template, request, jsonify, session
from app.utils.database import bd
from app.utils.scripts import gera_passe_random, decode, encode
from app.utils.email import enviar_email
from flask_login import login_user, logout_user, current_user, login_required
from app.ext.auth import User
import os

@root_routes.route('/')
@root_routes.route('/home')
def home():
    return render_template("home.html")

@root_routes.route('/projetos', methods=['POST','GET'])
def projetos():
    if request.method == 'POST':
        try:
            connection, cursor = bd()
            cursor.execute('select * from projets')
            dados = cursor.fetchall()
            connection.close()

            list_proj = []

            for x in dados:
                if (x[3] == ""):
                    x[3]=0
                list_proj.append({
                    "id": x[0] ,
                    "name": x[1] ,
                    "descript": x[2] ,
                    "img": x[3]  ,
                })

            return jsonify(list_proj), 200
        except Exception as erro:
            return jsonify({'error':erro}), 500
    return render_template("projetos.html")

@root_routes.route('/projeto', methods=['POST','GET'])
def projeto():
    if request.method == 'POST':
        try:
            projetoId = request.args.get('id')
            connection, cursor = bd()
            cursor.execute(f"select * from projets where id ='{projetoId}'")
            dados = cursor.fetchall()
            connection.close()

            proj = []
            for x in dados:
                proj.append({
                    "projetc_name": x[1] ,
                    "galeria": x[4]
                })

            return jsonify(proj), 200
        except Exception as erro:
            return jsonify({'error':erro}), 500
    return render_template("projeto_itens.html")

@root_routes.route('/about')
def about():
    return render_template("about.html")

@root_routes.route('/contact')
def contact():
    return render_template("contact.html")


@root_routes.route('/register', methods=['POST'])
def register():
    nome = request.form.get('nome')
    email_register = request.form.get('email_register')
    telefone = request.form.get('telefone')
    endereco = request.form.get('endereco')
    cidade = request.form.get('cidade')
    estado = request.form.get('estado')
    passe_register = request.form.get('passe_register')

    connection, cursor = bd()
    passe_encode = encode(passe_register)
    
    cursor.execute(f"INSERT INTO utilisateur VALUES('{nome}','{email_register}','{telefone}',\
                    '{endereco}','{cidade}','{estado}','{passe_encode}','')")
    connection.commit()
    connection.close()
    return jsonify({'ok': 'ok'}), 200

@root_routes.route('/login', methods=['POST'])
def login():

    email = request.form.get('email')
    passe = request.form.get('passe')

    connection, cursor = bd()
    
    cursor.execute(f"select nome, passe from utilisateur where email = '{email}'")
    dados_bd = cursor.fetchall()

    if len(dados_bd) == 0:
        return jsonify({"error": "email invalido"}), 500
    else: 
        user, user_passe = dados_bd[0]

    passe_decode = decode(user_passe)['passe']

    if passe_decode != passe:
        return jsonify({"error": "senha invalida"}), 500


    login_user(User(user))
    session['utilisateur'] = user
    
    connection.close()
    return jsonify({'ok': user}), 200

@root_routes.route('/logout', methods=['GET'])
def logout():

    logout_user()
    session['utilisateur'] = ''

    return jsonify({'ok': 'ok'}), 200

@root_routes.route('/reset/envia_email', methods=['POST'])
def reset_envia_email():
    email = request.form.get('email_reset')
    passe_random = gera_passe_random()
    connection, cursor = bd()
    passe_random_encoded = encode(passe_random)

    corpo_email = f"Olá Usuário, sua senha temporária é: {passe_random}<br>Troque sua senha pelo link: (link aqui)"

    enviar_email(corpo_email, email, 'Reset de Senha')
    
    cursor.execute(f"update utilisateur set passe_temporaire = '{passe_random_encoded}' where email = '{email}'")
    connection.commit()

    connection.close()


    return jsonify({"ok": 'email enviado'}), 200

@root_routes.route('/reset/reset_senha', methods=['POST'])
def reset_senha():
    senha_temporaria = request.form.get('senha_temporaria')
    senha_nova = request.form.get('senha_nova')

    senha_temporaria_encoded = encode(senha_temporaria)
    senha_nova_encoded = encode(senha_nova)
    connection, cursor = bd()
    
    cursor.execute(f"update utilisateur set passe = '{senha_nova_encoded}' where passe_temporaire = '{senha_temporaria_encoded}'")
    connection.commit()

    cursor.execute(f"update utilisateur set passe_temporaire = '' where passe_temporaire = '{senha_temporaria_encoded}'")
    connection.commit()

    connection.close()
    return jsonify({"ok": 'senha trocada com sucesso'}), 200

@root_routes.route('/face_analise')
def face_analise():
    return render_template("face.html")

@root_routes.route('/produtos')
def produtos():
    return render_template("produtos.html")

@root_routes.route('/produtos/orcamento', methods=['POST'])
def produtos_orcamento():
    produto = request.form.get('produto')
    largura = float(request.form.get('largura'))
    comprimento = float(request.form.get('comprimento'))

    connection, cursor = bd()
    cursor.execute(f"select preco_x_metro, disponibilidade from produits where produto = '{produto}'")
    dados_produto = cursor.fetchall()
    print(dados_produto)

    cursor.execute(f"select email from utilisateur where nome = '{current_user}'")
    email_para = cursor.fetchall()[0][0]
    connection.close()

    preco_m2 = round((largura * comprimento) * float(dados_produto[0][0]),2)

    corpo_email = f"Olá {current_user}!<br><br>\
                    Produto requerido: {produto}<br>\
                    Largura: {largura}m<br>\
                    Comprimento: {comprimento}m<br><br>\
                    Custo aproximado: R${preco_m2}"

    enviar_email(corpo_email, email_para, f'Orçamento - {produto}')

    return jsonify({'ok':'ok'}), 200

@root_routes.route('/produtos/carrega_cards')
def produtos_carrega_cards():
    try:
        connection, cursor = bd()
        cursor.execute('select produto, path_image, disponibilidade, descricao from produits')
        dados = cursor.fetchall()
        connection.close()

        list_produtos = []

        for x in dados:
            list_produtos.append({
                'produto': x[0],
                'path_image': x[1],
                'disponibilidade': x[2],
                'descricao': x[3]
            })

        return jsonify({'ok':list_produtos}), 200
    except Exception as erro:
        return jsonify({'error':erro}), 500


#CRUD
@root_routes.route('/gerenciamento')
def gerenciamento():
    return render_template("gerenciamento_index.html")

@root_routes.route('/gerenciamento/imagens', methods=['GET'])
@login_required
def gerenciamentoImagens():
    return render_template("gerenciamento_imagens.html")

@root_routes.route('/gerenciamento/imagens/upload', methods=['POST'])
@login_required
def gerenciamento_imagens_upload():
    for file in request.files:
        file = request.files[file]
        
        nome_foto = file.filename.rsplit('.')[0].replace(' ', '_')

        archives = pasta_cliente()
        endArchive = len(archives) + 1

        for extension in ['png','jpg','jpeg']:
            if file.filename.rsplit('.', 1)[0].lower() == extension:
                break
        file.save(os.path.join('static/images/cliente', f"{nome_foto}.png" ))
    return jsonify({'ok': 'ok'}), 200

@root_routes.route('/gerenciamento/imagens/load_data')
@login_required
def gerenciamento_imagens_load_data():
    for root, dirs, files in os.walk('static/images/cliente'):
        img = sorted(files)
    return jsonify({'ok': img}), 200

@root_routes.route('/gerenciamento/produtos')
@login_required
def gerenciamentoProdutos():
    return render_template("gerenciamento_produtos.html")

@root_routes.route('/gerenciamento/produtos/load_data')
@login_required
def gerenciamento_produtos_load_data():
    try:
        connection, cursor = bd()
        cursor.execute('select * from produits')
        dados = cursor.fetchall()
        connection.close()

        list_prod = []

        for x in dados:
            list_prod.append({
                "id": x[0],
                "produto": x[1],
                "preco_x_metro": x[2],
                "path_image": x[3],
                "photo": x[3],
                "disponibilidade": x[4],
                "descricao": x[5]
            })

        return jsonify(list_prod), 200
    except Exception as erro:
        return jsonify({'error':erro}), 500

@root_routes.route('/gerenciamento/projetos')
@login_required
def gerenciamentoProjetos():
    return render_template("gerenciamento_projetos.html")

@root_routes.route('/gerenciamento/projetos/load_data')
@login_required
def gerenciamentoProjetos_load_data():
    try:
        connection, cursor = bd()
        cursor.execute('select * from projets')
        dados = cursor.fetchall()
        connection.close()

        list_proj = []

        for x in dados:
            list_proj.append({
                "id": x[0] ,
                "nome": x[1] ,
                "descricao": x[2] ,
                "thumbnail": x[3] ,
                "photo": x[3] ,
                "galeria": x[4]
            })

        return jsonify(list_proj), 200
    except Exception as erro:
        return jsonify({'error':erro}), 500

@root_routes.route('/gerenciamento/usuarios')
@login_required
def gerenciamentoUsuarios():
    return render_template("gerenciamento_usuarios.html")

@root_routes.route('/gerenciamento/usuarios/load_data')
@login_required
def gerenciamento_usuarios_load_data():
    try:
        connection, cursor = bd()
        cursor.execute('select * from utilisateur')
        dados = cursor.fetchall()
        connection.close()

        list_users = []

        for x in dados:
            list_users.append({
                "id": x[0] ,
                "nome": x[1] ,
                "email": x[2] ,
                "telefone": x[3] ,
                "endereco": x[4] ,
                "cidade": x[5] ,
                "estado_sigla": x[6] ,
                "passe": decode(x[7])['passe'],
            })

        return jsonify(list_users), 200
    except Exception as erro:
        return jsonify({'error':erro}), 500

@root_routes.route('/gerenciamento/update', methods=['POST'])
@login_required
def gerenciamento_update():
    try:
        dto = request.form.get('table_database')
        field = request.form.get('coluna')
        newValue = request.form.get('valor')
        id = request.form.get('id')

        print(dto,field,newValue,id)


        connection, cursor = bd()
        cursor.execute(f"update {dto} set {field} = '{newValue}' where id = '{id}';")
        connection.commit()
        connection.close()
        return jsonify({'ok':'ok'}), 200
    except Exception as erro:
        return jsonify({'error':erro}), 500

@root_routes.route('/gerenciamento/insert', methods=['POST'])
@login_required
def gerenciamento_insert():
    try:
        dto = request.form.get('table')
        colunas = request.form.get('colunas')
        # value_data = request.get_json()['value_data']

        str_values = ['']*(int(colunas)-2)
        str_values = str(str_values).replace('[', '').replace(']', '')

        print(f"INSERT INTO lola.dbo.{dto} VALUES({str_values})")
        
        # if(dto == "utilisateur"):
        #     value_data['passe'] = encode(value_data['passe'])
        # fields = ', '.join(list(value_data.keys()))
        # values = tuple(list(value_data.values()))

        connection, cursor = bd() 
        cursor.execute(f"INSERT INTO lola.dbo.{dto} VALUES({str_values})")
        connection.commit()
        connection.close()
    
        return jsonify({'ok':'ok'}), 200
    except Exception as erro:
        return jsonify({'error':erro}), 500

@root_routes.route('/gerenciamento/delete', methods=['POST'])
@login_required
def gerenciamento_delete():
    try:
        table = request.form.get('table')
        rows = request.form.get('rows')

        connection, cursor = bd() 

        for row in rows.split(',')[:-1]:
            cursor.execute(f"delete from {table} where id = {row}")
            connection.commit()
        
        connection.close()


        return jsonify({'ok':'ok'}), 200
    except Exception as erro:
        return jsonify({'error':erro}), 500

def pasta_cliente():
    for root, dirs, files in os.walk('static/images/cliente'):
        archives = sorted(files)
    return archives