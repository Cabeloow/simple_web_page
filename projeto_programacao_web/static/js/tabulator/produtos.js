let table_database = "produits";
let forAddRow = {produto: "", preco_x_metro: "", path_image: "", disponibilidade: "", descricao: ""}
const disponivel = {"disponivel": "disponivel", "indisponivel": "indisponivel"};

//Build Tabulator
let table = new Tabulator("#table", {
    height: "auto",
    layout: "fitColumns",
    ajaxURL:"/gerenciamento/produtos/load_data",
    ajaxContentType:"json",
    selectable:true,
    history:true,
    reactiveData: true,
    columns: [
        { title: "Id", width: "50", field: "id", sorter: "number" },
        { title: "Nome", field: "produto", sorter: "string", editor: "input", cellEdited:function(cell){
            let valor = cell.getValue()
            let coluna = cell.getField()
            let id = cell.getRow()._row.data.id
            update_bd(coluna,table_database,id,valor)
        }, },
        { title: "Descriçao", field: "descricao", width: "200", sorter: "number", editor: "input", cellEdited:function(cell){
            let valor = cell.getValue()
            let coluna = cell.getField()
            let id = cell.getRow()._row.data.id
            update_bd(coluna,table_database,id,valor)
        }, },
        { title: "Preço x Metro", field: "preco_x_metro", sorter: "number", editor: "input", cellEdited:function(cell){
            let valor = cell.getValue()
            let coluna = cell.getField()
            let id = cell.getRow()._row.data.id
            update_bd(coluna,table_database,id,valor)
        }, },
        { title: "thumbnail", field: "path_image", sorter: "string", editor: "input", cellEdited:function(cell){
            let valor = cell.getValue()
            let coluna = cell.getField()
            let id = cell.getRow()._row.data.id
            update_bd(coluna,table_database,id,valor)
        }, },
        { title: "Foto", field: "photo", formatter:"image", editor: "image",formatterParams:{ height:"50px", width:"50px", urlPrefix: window.location.origin + "/static/images/cliente/", urlSuffix:".png"}},
        { title: "Disponibilidade", field: "disponibilidade", sorter: "string", editor: "list", editorParams: { values: disponivel }, cellEdited:function(cell){
            let valor = cell.getValue()
            let coluna = cell.getField()
            let id = cell.getRow()._row.data.id
            update_bd(coluna,table_database,id,valor)
        },  },
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

