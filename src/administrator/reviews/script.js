request = new PhpRequest();

window.onload = function () {
    const updateTable = new UpdateTable();
    const tableBody = document.getElementById("table-body"); // Get the tbody element
    updateTable.update(tableBody,PhpRequest.DB.StoricoRecensioni);

}


function worstFilter(){
    const updateTable = new UpdateTable();
    const tableBody = document.getElementById("table-body"); // Get the tbody element
    updateTable.update(tableBody,PhpRequest.DB.RecensioniPeggiori);
}

function bestFilter(){
    const updateTable = new UpdateTable();
    const tableBody = document.getElementById("table-body"); // Get the tbody element
    updateTable.update(tableBody,PhpRequest.DB.RecensioniMigliori);
}