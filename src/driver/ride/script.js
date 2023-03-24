window.onload = function () {
  const updateTable = new UpdateTable();
  const tableBody = document.getElementById("tableBody"); // Get the tbody element

  setInterval(function () {
      updateTable.update(tableBody,PhpRequest.DB.CorseDisponibili);
    
  }, 2000);


  // Add event listener to table rows, it makes a row marked when clicked.
  tableBody.addEventListener('click', function (event) {
    console.log("ciao");
    // Remove the green highlight from all rows
    const rows = tableBody.getElementsByTagName('tr');
    for (let i = 0; i < rows.length; i++) {
      rows[i].classList.remove('active-row');
    }
    // Add the green highlight 'active-row' class to the clicked row
    event.target.closest('tr').classList.add('active-row');
  });


  //TODO
  function handleButton() {


  }


}

