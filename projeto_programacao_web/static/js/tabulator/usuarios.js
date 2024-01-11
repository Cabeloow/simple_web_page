const estadosTabulador = {
    "AC": "AC", "AL": "AL", "AP": "AP", "AM": "AM", "BA": "BA", "CE": "CE", "DF": "DF",
    "ES": "ES", "GO": "GO", "MA": "MA", "MT": "MT", "MS": "MS", "MG": "MG", "PA": "PA",
    "PB": "PB", "PR": "PR", "PE": "PE", "PI": "PI", "RJ": "RJ", "RN": "RN", "RS": "RS",
    "RO": "RO", "RR": "RR", "SC": "SC", "SP": "SP", "SE": "SE", "TO": "TO"
}
let forAddRow = {nome: "", passe: "", email: "", telefone: "", endereco: "", estado_sigla: "", cidade: ""}
let table_database = "utilisateur";

//Build Tabulator
let table = new Tabulator("#table", {
    height: "auto",
    ajaxURL:"/gerenciamento/usuarios/load_data",
    ajaxContentType:"json",
    layout: "fitColumns",
    history:true,
    selectable:true,
    reactiveData: true,
    columns: [
        { title: "Id", field: "id", width: "50", sorter: "number" },
        { title: "Nome", field: "nome", sorter: "string", editor: "input", cellEdited:function(cell){
            let valor = cell.getValue()
            let coluna = cell.getField()
            let id = cell.getRow()._row.data.id
            update_bd(coluna,table_database,id,valor)
        }, },
        { title: "E-mail", field: "email", sorter: "string", editor: "input", cellEdited:function(cell){
            let valor = cell.getValue()
            let coluna = cell.getField()
            let id = cell.getRow()._row.data.id
            update_bd(coluna,table_database,id,valor)
        }, },
        { title: "Senha", field: "passe", sorter: "string", editor: "input", cellEdited:function(cell){
            let valor = cell.getValue()
            let coluna = cell.getField()
            let id = cell.getRow()._row.data.id
            update_bd(coluna,table_database,id,valor)
        }, },
        { title: "Telefone", field: "telefone", sorter: "string", editor: "input", cellEdited:function(cell){
            let valor = cell.getValue()
            let coluna = cell.getField()
            let id = cell.getRow()._row.data.id
            update_bd(coluna,table_database,id,valor)
        }, },
        { title: "Endereço", field: "endereco", sorter: "string", editor: "input", cellEdited:function(cell){
            let valor = cell.getValue()
            let coluna = cell.getField()
            let id = cell.getRow()._row.data.id
            update_bd(coluna,table_database,id,valor)
        }, },
        { title: "Estado", field: "estado_sigla", sorter: "string", editor: "list", editorParams: { values: estadosTabulador }, cellEdited:function(cell){
            let valor = cell.getValue()
            let coluna = cell.getField()
            let id = cell.getRow()._row.data.id
            update_bd(coluna,table_database,id,valor)
        }, },
        { title: "Cidade", field: "cidade", sorter: "string", editor: "input", cellEdited:function(cell){
            let valor = cell.getValue()
            let coluna = cell.getField()
            let id = cell.getRow()._row.data.id
            update_bd(coluna,table_database,id,valor)
        }, },
    ],
});


function update_bd(coluna,table_database,id,valor) {
    $.ajax({
    data: {'coluna': coluna,
            'table_database': table_database,
            'id': id,
            'valor': valor,
        },
    dataType: 'JSON',
    url: '/gerenciamento/update',
    type: 'POST',
    success: function(result){
        toastr["success"](coluna+" alterado!")
    },
    error: function(jqXHR, textStatus, errorThrown){
        popup.error();
        console.log(jqXHR.responseJSON.error)
    }
})
}

$("#btn-delete-table").click(function () {
    let lista_row = []
    let data = {'rows': '',
                'table': table_database}
    for (row of table.getSelectedRows()) {
        data['rows']+= row._row.data.id+","
        lista_row.push(row)
    }
    $.ajax({
        data: data,
        dataType: 'JSON',
        url: '/gerenciamento/delete',
        type: 'POST',
        success: function(result){
            toastr["success"]("Registro(s) excluído(s)!")
            table.deleteRow(lista_row)
        },
        error: function(jqXHR, textStatus, errorThrown){
            popup.error();
            console.log(jqXHR.responseJSON.error)
        }
    })
})

$("#btn-add-table").click(function () {
    len_colunas = table.getColumns().length
    $.ajax({
        data: {'table': table_database,
                'colunas': len_colunas},
        dataType: 'JSON',
        url: '/gerenciamento/insert',
        type: 'POST',
        success: function(result){
            table.replaceData("/gerenciamento/produtos/load_data")
            toastr["success"]("Linha Adicionada com sucesso!")
        },
        error: function(jqXHR, textStatus, errorThrown){
            popup.error();
            console.log(jqXHR.responseJSON.error)
        }
    })
})


$(document).ready(function () {
    toastr.options = {
        "closeButton": true,
        "debug": false,
        "newestOnTop": false,
        "progressBar": true,
        "positionClass": "toast-bottom-right",
        "preventDuplicates": true,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
        }
})
