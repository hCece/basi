
//when pager is requested fill the table body with TopClienti procedure
window.onload = function () {
    const update = new Update();
    const tableBody = document.getElementById("table-body"); // Get the tbody element
    update.table(tableBody,PhpRequest.Cliente.Top);
}