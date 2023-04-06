request = new PhpRequest();

window.onload = function () {
    const update = new Update();
    const tableBody = document.getElementById("table-body"); // Get the tbody element
    update.table(tableBody,PhpRequest.Recensioni.Storico);

}


function worstFilter(){
    const update = new Update();
    const tableBody = document.getElementById("table-body"); // Get the tbody element
    update.table(tableBody,PhpRequest.Recensioni.Peggiori);
}

function bestFilter(){
    const update = new Update();
    const tableBody = document.getElementById("table-body"); // Get the tbody element
    update.table(tableBody,PhpRequest.Recensioni.Migliori);
}