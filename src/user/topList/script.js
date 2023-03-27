

window.onload = function () {
    const updateTable = new UpdateTable();
    const tableBody = document.getElementById("table-body"); // Get the tbody element
    updateTable.update(tableBody,PhpRequest.DB.TopClienti);
}