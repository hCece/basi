

window.onload = function () {
    const update = new Update();
    const tableBody = document.getElementById("table-body"); // Get the tbody element
    update.table(tableBody,PhpRequest.Cliente.Top);
}