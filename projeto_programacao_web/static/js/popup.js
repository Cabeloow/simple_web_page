const popup = new Object();

popup.loginSucess = function(){
    Sweetalert2.fire({
        title:'Login',
        text:'realizado com sucesso!',
        icon:'success',
        showConfirmButton: false,
        timer: 2000
    });
}

popup.registerSucess = function(){
    Sweetalert2.fire({
        title:'Cadrastro',
        text:'realizado com sucesso!',
        icon:'success',
        showConfirmButton: false,
        timer: 2000
    });
}

popup.logoutSucess = function(){
    Sweetalert2.fire({
        title:'Logout',
        text:'realizado com sucesso!',
        icon:'success',
        showConfirmButton: false,
        timer: 2000
    });
}

popup.error = function(){
    Sweetalert2.fire({
        title:'Oopa...',
        text:'Favor verificar os dados',
        icon:'error'
    });
}

popup.emptyField = function(){
    Sweetalert2.fire({
        title:'Oopa...',
        text:'Favor preencher todos os campos',
        icon:'error'
    });
}

popup.passNotEqual = function(){
    Sweetalert2.fire({
        title:'Oopa...',
        text:'Favor preencher com senhas iguais!',
        icon:'error'
    });
}

popup.notDeleteRow =  function(){
    Sweetalert2.fire({
    title:'Não pode deletar!',
});
}