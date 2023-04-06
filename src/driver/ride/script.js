/*  The script wait's till the html site is loaded and then every two seconds calls
    class updateTable to update the values. The updating into the table is delegated to updateTable
*/
window.onload = function () {
  const update = new Update();
  const tableBody = document.getElementById("tableBody"); // Get the tbody element

  setInterval(function () {
      update.table(tableBody,PhpRequest.Corsa.Disponibili);
  }, 2000);


  // Add event listener to table rows, it makes a row marked when clicked.
  tableBody.addEventListener('click', function (event) {
    // Remove the green highlight from all rows
    const rows = tableBody.getElementsByTagName('tr');
    for (let i = 0; i < rows.length; i++) {
      rows[i].classList.remove('active-row');
    }
    // Add the green highlight 'active-row' class to the clicked row
    event.target.closest('tr').classList.add('active-row');
  });


}

function handleButton() {
  var php = new PhpRequest();
  let row = document.querySelector('.active-row');

  let idP = row.cells[0].textContent;
  let start = row.cells[1].textContent;
  let end = row.cells[2].textContent;
  let userClient = row.cells[5].textContent;
  let cost = row.cells[6].textContent;
  
  var json = {
    idP:Number(idP),
    partenza: start,
    arrivo: end,
    usernameCliente:userClient,
    usernameTassista:getCookie("user"),
    importo:Number(cost)
  }
  console.log(json)
  php.mySql(PhpRequest.Corsa.Aggiungi, "POST", json);
  var res = php.getResponse();
  console.log(res);
  alert("Hai preso in carico una corsa. Il tuo cliente ti aspetta");
}


function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}
