document.getElementById("btn-add-table").addEventListener("click", function(){
    table.addRow(forAddRow);
});

// //remove bottom row from table on button click
// document.getElementById("btn-delete-table").addEventListener("click", function(){
//     if (table.rowManager.rows[table.rowManager.rows.length-1].data.id == null){
//         table.rowManager.deleteRow(table.rowManager.rows[table.rowManager.rows.length-1]);
//     }else{
//         popup.notDeleteRow();
//     }
// });

// //update name on first row in table on button click
// document.getElementById("btn-update-table").addEventListener("click", function(){
//     tabledata[0].name = "IVE BEEN UPDATED";
// });