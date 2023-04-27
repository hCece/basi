request = new PhpRequest();

let cookies = document.cookie;

var sp = cookies.split(';'); // here we split the cookies by semicolon and
var user = null;            //look for the cookie with username
for (var i = 0; i < sp.length; i++) {
  var cookie = sp[i].trim();
  if (cookie.indexOf('user=') == 0) {
    user = cookie.substring('user='.length);
    console.log(user);
    break;
  }
}

document.getElementById("title").textContent = "Lista delle corse eseguite da " + user;

//when the page is requested fill the table by StoricoCorse procedure
window.onload = function () {
  const update = new Update();
  const tableBody = document.getElementById("table-body");
  update.table(tableBody, PhpRequest.Corsa.Storico, { user: user });

  var results = [];
  //add a button at the end of each row
  for (let i = 0; i < tableBody.rows.length; i++) {

    // Get the username from the last column in each row
    const user = tableBody.rows[i].cells[4].innerText;
    // make request here and set response to variable x
    // you can use the PhpRequest.mySql method to make the query
    request.mySql(PhpRequest.Utente.GetTel, "POST", { user: user });
    const tel = request.getResponse(); // store the result in a variable
    // create a new cell for the tel column and add the value
    const telCell = tableBody.rows[i].insertCell(-1);
    telCell.innerText = tel;


    var idc = tableBody.rows[i].cells[0].innerText;
    request.mySql(PhpRequest.Recensione.Visualizza, "POST",
      { idc: idc });//here we are passing the idc value from the first column in each row
    results[i] = request.getResponse(); //keep the procedure output in the results array

    //then add a button at the end of each row
    // create a new cell for the button
    const cell = tableBody.rows[i].insertCell(-1);
    // create a new button element
    const button = document.createElement("button");
    // Get the values of voto and commento from sp.visualizzaRecensione

    //if the response is not empty create a button clickable to get the review
    if (results[i] && results[i].trim() != "") {

      button.innerText = "Visualizza commento";
      button.style.background = '#6a64f1';
      button.style.cursor = 'pointer';

      button.addEventListener("click", function () {
        //on click call the openPopup function with the appropriate idc
        openPopup(results[i]);
      });
    } else {
      //set grey not cickable button
      button.innerText = "Nessun commento";
      button.style.background = "grey";
    }
    // add the button to the cell
    cell.appendChild(button);
  }
}

//this function shows the value of the review
function openPopup(response) {

  var sp = response.split('-')
  // Set the text of the span elements in the pop up
  document.getElementById("Votovalue").textContent = sp[0];
  document.getElementById("Commentovalue").textContent = sp[1];
  // Display the pop up
  document.getElementById("popup").style.display = "block";
}

//close the popup
function closePopup() {
  // Hide the pop up
  document.getElementById("popup").style.display = "none";
}
