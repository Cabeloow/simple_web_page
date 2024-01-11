// Função de login
$("#btn_login").click(function(){
    let email = $("#input_email").val()
    let passe = $("#input_passe").val()

    if (email == '' || passe == ''){
        console.log('*** Erro no login ***')
        popup.error();
    } else {
        $.ajax({
            data: {
                'email':email,
                'passe':passe
            },
            dataType: 'JSON',
            url: '/login',
            type: 'POST',
            success: function(result){
                location.reload()
                popup.loginSucess();
                utilisateur = result.ok
                $("#input_email").val('')
                $("#input_passe").val('')
                $("#btn_abre_login").hide()
                $("#btn_logout").show()
                $("#modal_login").modal('hide')
            },
            error: function(jqXHR, textStatus, errorThrown){
                popup.error();
                console.log(jqXHR.responseJSON.error)
            }
        })
    }
})

// Função de logout
$("#btn_logout").click(function(){
    $("#btn_abre_login").show()
    $("#btn_logout").hide()

    $.ajax({
        dataType: 'JSON',
        url: '/logout',
        type: 'GET',
        success: function(result){
            popup.logoutSucess();
            utilisateur = ''
            location.reload()
        },
        error: function(jqXHR, textStatus, errorThrown){
            console.log(jqXHR.responseJSON.error)
        }
    })
})

// event listener para limpar forms do registro ao fechar o modal reset senha
$("#modal_reset_envia_email").on('hide.bs.modal', function(){
    $("#input_email_reset_senha").val('')
  });


// Função para enviar email de reset de senha
$("#btn_reset_envia_email").click(function(){
    let email_reset = $("#input_email_reset_senha").val()
    
    if (email_reset == ''){
        popup.emptyField();
    
    } else {
        $.ajax({
            data: {
                'email_reset': email_reset
            },
            dataType: 'JSON',
            url: '/reset/envia_email',
            type: 'POST',
            success: function(result){
                console.log(result)
                
            },
            error: function(result){
                console.log(result.senha_invalida)
            }
        })
    }        
    })


// event listener para limpar forms do registro ao fechar o modal reset senha
$("#modal_reset_senha").on('hide.bs.modal', function(){
    $("#senha_temporaria").val('')
    $("#senha_nova_1").val('')
    $("#senha_nova_2").val('')
  });

$("#btn_reset_confirma").click(function(){
    let senha_temporaria = $("#senha_temporaria").val()
    let senha_nova_1 = $("#senha_nova_1").val()
    let senha_nova_2 = $("#senha_nova_2").val()

    if (senha_temporaria == '' || senha_nova_1 == '' || senha_nova_2 == ''){
        popup.emptyField();
    } else {
        if (senha_nova_1 != senha_nova_2){
            popup.passNotEqual();
        } else {
            $.ajax({
            data: {
                'senha_temporaria': senha_temporaria,
                'senha_nova': senha_nova_1
            },
            dataType: 'JSON',
            url: '/reset/reset_senha',
            type: 'POST',
            success: function(result){
                console.log(result)
                popup.loginSucess();
            },
            error: function(result){
                
                console.log(result.senha_invalida)
            }
        })
        }
        
    }
})


$(function() {
    if (utilisateur != ''){
        $("#btn_abre_login").hide()
        $("#btn_logout").show()
    }
    const urlGenTop = window.location.pathname.split('/');
    $(`#${urlGenTop[urlGenTop.length-1]}`).addClass('active')
    feather.replace()
});
