let result = ['1', '2', '3', '4']

function carrega_fotos() {

    $.ajax({
        dataType: 'JSON',
        url: window.location.href,
        type: 'POST',
        success: function (result) {
            result[0].galeria.split(',').map(function (teste, index){
                let id = 'projeto_' + index
                $("#itens_projeto").append(`
                <div class="col-lg-3 col-md-4 col-xs-6 thumb">
                    <a href="${window.location.origin}/static/images/cliente/${teste}.png" class="fancybox" rel="ligthbox">
                        <img src="${window.location.origin}/static/images/cliente/${teste}.png" class="zoom img-fluid" alt="">
                    </a>
                </div>
                `)
            })

            $(".fancybox").fancybox({
                openEffect: "none",
                closeEffect: "none"
            });
        
            $(".zoom").hover(function(){   
                $(this).addClass('transition');
            }, function(){      
                $(this).removeClass('transition');
            });
        },
        error: function (jqXHR, textStatus, errorThrown) {
            popup.error();
            console.log(jqXHR.responseJSON.error)
        }
    })
}

$(function () {
    carrega_fotos();
})