// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }
  
          form.classList.add('was-validated')
        }, false)
      })
  })()


$("#btn_receber_orcamento").click(function(){
    if (utilisateur == ''){
        Swal.fire({
            title: 'Para prosseguir você Precisa se logar!',
            text: "Enviaremos o orçamento no seu e-mail cadastrado!",
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: 'Registrar-se',
            confirmButtonText: 'Login'
          }).then((result) => {
            if (result.isConfirmed) {
                $("#modal_login").modal('show')
                $("#modal_orcamento").modal('hide')

            } else {
                $("#modal_register").modal('show')
                $("#modal_orcamento").modal('hide')
            }
          })
    } else if ($("#modal_orcamentoLabel").text() == '' || $("#comprimento").val() == '') {
      Swal.fire({
        text:'Preencha todos os campos!',
        icon:'warning'
      });
    } else {
      $.ajax({
        data: {
            'produto':$("#modal_orcamentoLabel").text(),
            'largura':$("#largura").val(),
            'comprimento':$("#comprimento").val()
        },
        dataType: 'JSON',
        url: '/produtos/orcamento',
        type: 'POST',
        success: function(result){
          $("#largura").val('')
          $("#comprimento").val('')
          Sweetalert2.fire({
            text:'Seu orçamento foi enviado para o e-mail cadastrado!',
            icon:'success'
        });
        },
        error: function(jqXHR, textStatus, errorThrown){
            popup.error();
            console.log(jqXHR.responseJSON.error)
        }
    })
    }
})

function carrega_cards() {
  $.ajax({
    dataType: 'JSON',
    url: '/produtos/carrega_cards',
    type: 'GET',
    success: function(result){
      let disponibilidade = ''
      for (teste of result.ok){
        console.log(teste)
        if (teste['disponibilidade'] == 'indisponivel'){
          disponibilidade = "<b>Produto indisponível</b>"
        } else {
          disponibilidade = `<a id='${teste['produto']}' class='btn btn-link stretched-link'>Solicite Orçamento</a>`
        }


        $("#cards_orcamento").append(`<div class='col'>\
              <div class='card text-white mb-3' style='background-color: #233a3794' >\
                  <img src='static/images/cliente/${teste['path_image']}.png' class='card-img-top p-2 rounded' alt='...' style="height:20em;">\
                  <div class='card-body'>\
                      <h5 class='card-title'>${teste['produto']}</h5>\
                      <p class='card-text'>${teste['descricao']}.</p>\
                      ${disponibilidade}\
                  </div>\
              </div>\
          </div>`)
      }
      $(".stretched-link").click(function(){
        $("#modal_orcamentoLabel").text(this.id)
        $("#modal_orcamento").modal('show')
    })
    },
    error: function(jqXHR, textStatus, errorThrown){
        popup.error();
        console.log(jqXHR.responseJSON.error)
    }
})
}

$(function() {
  carrega_cards()
  
});
