//TODO: test if it works. i put out update from each function

request = new PhpRequest();
const update = new Update();

//when the page is requested fill the table by StoricoRecensioni procedure
//from newest to oldest sort
window.onload = function () {
    const tableBody = document.getElementById("table-body"); // Get the tbody element
    update.table(tableBody,PhpRequest.Recensioni.Storico);

}

//call RecensioniPeggiori for worst to best rating sort
function worstFilter(){
    const tableBody = document.getElementById("table-body"); // Get the tbody element
    update.table(tableBody,PhpRequest.Recensioni.Peggiori);
}

//call RecensioniMigliori for best to worse rating sort
function bestFilter(){
    const tableBody = document.getElementById("table-body"); // Get the tbody element
    update.table(tableBody,PhpRequest.Recensioni.Migliori);
}