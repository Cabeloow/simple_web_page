//Usuario: Nome, e-mail,  senha, telefone, endereço, cidade e estado
let tabledata = [
    { id: 1, nome: "Oli Bob", descricao: "descricao aqui", thumbnail:"logopng", image: "logopng", galeria:"1,2,3"},
    { id: 2, nome: "Mary May", descricao: "descricao aqui", thumbnail:"logopng", image: "logopng", galeria:"1,2,3"},
    { id: 3, nome: "Christine Lobowski", descricao: "descricao aqui", thumbnail:"logopng", image: "logopng", galeria:"1,2,3"},
    { id: 4, nome: "Brendon Philips", descricao: "descricao aqui", thumbnail:"logopng", image: "logopng", galeria:"1,2,3"},
    { id: 5, nome: "Margret Marmajuke", descricao: "descricao aqui", thumbnail:"logopng", image: "logopng", galeria:"1,2,3"},
];

//Build Tabulator
let table = new Tabulator("#table", {
    height: "auto",
    layout: "fitColumns",
    history:true, //record table history
    reactiveData: true, //turn on data reactivity
    data: tabledata, //load data into table
    columns: [
        { title: "Id", field: "id", width: "50", sorter: "number" },
        { title: "Nome", field: "nome", sorter: "string", editor: "input" },
        { title: "Descrição", field: "descricao", sorter: "string", editor: "input" },
        { title: "Nome da foto", field: "thumbnail", sorter: "string", editor: "input" },
        { title: "Foto", field: "image", formatter:"image", editor: "image",formatterParams:{ height:"50px", width:"50px", urlPrefix: window.location.origin + "/static/images/", urlSuffix:".png" }},
        { title: "Galeria", field: "galeria", sorter: "string", editor: "input" },
    ],
});

function backupTable(input){
    let retorno =[];
    for (let x = 0; x < input.length; x++) {
        const element = `{
            "nome":"${input[x].nome}",
            "email":"${input[x].email}",
            "senha":"${input[x].senha}",
            "telefone":"${input[x].telefone}",
            "endereco":"${input[x].endereco}",
            "estado":"${input[x].estado}",
            "cidade":"${input[x].cidade}"
        }`
        retorno.push(JSON.parse(element));
    }
    return retorno;
}
