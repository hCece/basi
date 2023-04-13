
//when pager is requested fill the table body with TopClienti procedure
window.onload = function () {
    const updateTable = new UpdateTable();
    const tableBody = document.getElementById("table-body");
    updateTable.update(tableBody,PhpRequest.DB.TopClienti);
}