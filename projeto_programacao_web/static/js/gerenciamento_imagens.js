function carrega_fotos() {
  $("#imagesServer").empty()

    $.ajax({
      dataType: 'JSON',
      url: '/gerenciamento/imagens/load_data',
      type: 'GET',
      success: function(result){
        for (teste of result.ok){
          $("#imagesServer").append(`
            <div class="col-lg-3 col-md-4 col-xs-6 thumb">
                <a href="/static/images/cliente/${teste}" class="fancybox" rel="ligthbox">
                    <img  src="/static/images/cliente/${teste}" class="zoom img-fluid "  alt="">
                </a>
            </div>
          `)
        }
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
      error: function(jqXHR, textStatus, errorThrown){
          popup.error();
          console.log(jqXHR.responseJSON.error)
      }
  })
}
  

  
  
  let myDropzone = new Dropzone("div#drop_zone", {
    url: "/gerenciamento/imagens/upload",
    autoProcessQueue: false,
    uploadMultiple: true,
    maxFiles: 10,
    clickable: true,
    complete: function (file) {
      
    }
  });
  
$("#btn_upload").click(function () {
  myDropzone.uploadFiles(myDropzone.files)
  Sweetalert2.fire({
    text:'Upload concluído!',
    icon:'success'
  });
  myDropzone.removeAllFiles()
  carrega_fotos()
})


$("#btn_cancel").click(function () {
  myDropzone.removeAllFiles()
})



$(function() {
  
  carrega_fotos()
});