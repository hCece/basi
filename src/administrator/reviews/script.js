request = new PhpRequest();

//when the page is requested fill the table by StoricoRecensioni procedure
//from newest to oldest sort
window.onload = function () {
    const updateTable = new UpdateTable();
    const tableBody = document.getElementById("table-body");
    updateTable.update(tableBody,PhpRequest.DB.StoricoRecensioni);

}

//call RecensioniPeggiori for worst to best rating sort
function worstFilter(){
    const updateTable = new UpdateTable();
    const tableBody = document.getElementById("table-body");
    updateTable.update(tableBody,PhpRequest.DB.RecensioniPeggiori);
}

//call RecensioniMigliori for best to worse rating sort
function bestFilter(){
    const updateTable = new UpdateTable();
    const tableBody = document.getElementById("table-body");
    updateTable.update(tableBody,PhpRequest.DB.RecensioniMigliori);
}