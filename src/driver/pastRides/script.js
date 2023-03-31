request = new PhpRequest();

let cookies = document.cookie;

var sp = cookies.split(';'); // here we split the cookies by semicolon and
var user = null;
for (var i = 0; i < sp.length; i++) { //look for the cookie with username
  var cookie = sp[i].trim();
  if (cookie.indexOf('user=') == 0) {
    user = cookie.substring('user='.length);
    console.log(user);
    break;
  }
}

document.getElementById("title").textContent = "Lista delle corse eseguite da " + user;

window.onload = function () {
  const updateTable = new UpdateTable();
  const tableBody = document.getElementById("table-body"); // Get the tbody element
  updateTable.update(tableBody,PhpRequest.DB.StoricoCorse,{user:user});

  for (let i = 0; i < tableBody.rows.length; i++) {
      // create a new cell for the button
      const cell = tableBody.rows[i].insertCell(-1);
      // create a new button element
      const button = document.createElement("button");
      // Get the values of voto and commento from sp.visualizzaRecensione
      request.mySql(PhpRequest.DB.VisualizzaRecensione, "POST",
      {idc: tableBody.rows[i].cells[0].innerText});
      response = request.getResponse();
      //if the response is not empty create a button to get the review
      if((response.trim().length > 0)){
        //set active button properties
         button.innerText = "Visualizza commento";
         button.style.background= '#6a64f1';
         button.style.cursor = 'pointer';

         button.addEventListener("click", function() {
            //on click call the openPopup function with the appropriate voto and commento value
            openPopup(tableBody.rows[i].cells[0].innerText);
         });
      }else{
        //set grey not cickable button
         button.innerText = "Nessun commento";
         button.style.background = "grey";
      }
      // add the button to the cell
      cell.appendChild(button);
    }
}
function openPopup(idc) {

    request.mySql(PhpRequest.DB.VisualizzaRecensione, "POST",{idc:idc});
    response = request.getResponse(); //output format: voto - commento
    var sp=response.split('-')
    // Set the text of the span elements in the pop up
    document.getElementById("Votovalue").textContent = sp[0];
    document.getElementById("Commentovalue").textContent = sp[1];
    // Display the pop up
    document.getElementById("popup").style.display = "block";
}

function closePopup() {
    // Hide the pop up
    document.getElementById("popup").style.display = "none";
}
