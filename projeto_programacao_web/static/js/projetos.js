function carrega_fotos() { 
    $.ajax({
        dataType: 'JSON',
        url: 'projetos',
        type: 'POST',
        success: function (result) {
            result.map(function (teste, index){
                let id = 'projeto_' + index
        
                $("#projetos-page").append(`
                <div class="col item" id="${id}">
                    <div class="card text-white mb-3" style="background-color: #233a3794">
                        <img src="static/images/cliente/${teste.img}.png" class="card-img-top p-2 rounded" alt="..." style="height:20em;">
                            <div class="card-body">
                                <h5 class="card-title">${teste.name}<a class="btn stretched-link""></a></h5>
                                <p class="card-text">${teste.descript}.</p>
                            </div>
                    </div>
                </div>
                `)
        
                document.getElementById(id).addEventListener('click', function() {
                    window.location.href = window.location.origin +  "/projeto?" + new URLSearchParams({id:teste.id}).toString();
                })
        
            })
        },
        error: function (jqXHR, textStatus, errorThrown) {
            popup.error();
            console.log(jqXHR.responseJSON.error)
        }
    })
}

$(function () {
    carrega_fotos()
});