
/*  The file handles both buttons and calls updateTable every two seconds, 
    sending the tablebody to delegate the input into the table.
*/
window.onload = function () {
    const update = new Update();
    const tableBody = document.getElementById("tableBody"); // Get the tbody element
  
    //Updating the table every two seconds
    setInterval(function () {
        update.table(tableBody, PhpRequest.Richiesta.Get);
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
  
function handleApprove() {
    row = document.getElementsByClassName('active-row')[0];
    idr = row.innerHTML.split("<td>")[1].split("</td>")[0];
    phpRequest.mySql(PhpRequest.Richiesta.Approva, "POST", {idr : idr});
  }
  
  function handleDecline() {
    //phpRequest.mySql(PhpRequest.Richiesta.Rifiuta, "POST");  
  }