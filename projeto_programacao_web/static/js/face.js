
$.ajax(
  { url: 'https://s3.amazonaws.com/analise-rosto-site/dados.json',
   dataType: 'json',
   crossDomain: true,
   success: function (dados) {
      var foto_analisada = document.getElementById('foto_analisada');
      foto_analisada.src = "https://s3.amazonaws.com/analise-rosto-imagens/_analise.png";
      var card_labels = document.getElementById('teste');
      for (x of dados){
        if (x['label'] != undefined){
          card_labels.innerHTML += `${x['label']}: ${parseFloat(x['Confidence']).toFixed(2)} %<br>`
        }
      }
      montaTabela(dados);
      card_labels
      }
  })  

  function montaTabela(dados) {

    
    for (var dado of dados) {
      if (Object.keys(dado)[0] == 'nome'){
        var trTabela = document.createElement("tr");

        var tdInfoFoto = document.createElement("td");
        var tdInfoNome = document.createElement("td");
        var tdInfoFaceMatch = document.createElement("td");
        
  
        tdInfoNome.textContent = dado.nome;
        tdInfoFaceMatch.textContent = dado.faceMatch;
        tdInfoFoto = document.createElement("img");
        tdInfoFoto.height = 100;
        tdInfoFoto.width = 100;
        tdInfoFoto.src = 'https://s3.amazonaws.com/analise-rosto-imagens/' + dado.nome + '.png';
  
  
        trTabela.appendChild(tdInfoFoto);
        trTabela.appendChild(tdInfoNome);
        trTabela.appendChild(tdInfoFaceMatch);
        
        var tabela = document.querySelector("#tabela-site");
  
        tabela.appendChild(trTabela);
      }
      
    }
  }
