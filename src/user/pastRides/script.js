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

window.onload = function () {
  document.getElementById("title").textContent = "Lista delle corse eseguite da " + user;

  const updateTable = new UpdateTable();
  const tableBody = document.getElementById("table-body"); // Get the tbody element
  updateTable.update(tableBody,PhpRequest.DB.StoricoCorse,{user:user});

  // loop through each row in the table body
  for (let i = 0; i < tableBody.rows.length; i++) {
    // create a new cell for the button
    const cell = tableBody.rows[i].insertCell(-1);
    // create a new button element
    const button = document.createElement("button");
    button.innerText = "Visualizza commento";
    // add a click event listener to the button
    button.addEventListener("click", function() {
      // call the openPopup function with the appropriate IDC value
      openPopup(tableBody.rows[i].cells[0].innerText);
    });
    // add the button to the cell
    cell.appendChild(button);
  }

}

function openPopup(idc) {
    // Get the values of voto and commento from sp.visualizzaRecensione
    request.mySql(PhpRequest.DB.VisualizzaRecensione, "POST", {idc: idc});
    response = request.getResponse(); //output format: voto - commento
    console.log(response);
    if (response && response.trim() !== "") {
      var sp=response.split('-')
      // Set the text of the span elements in the pop up
      document.getElementById("Votovalue").textContent = sp[0];
      document.getElementById("Commentovalue").textContent = sp[1];
      document.getElementById("popup").style.display = "block";

    }
    else {
      const popup = document.getElementById("popup2");
      document.getElementById("popup2").style.display = "block";
      const button = document.getElementById("submit");
      button.addEventListener("click", function() {
      // call the submitReview() function with the appropriate IDC value
         submitReview(idc);
      });
    }

}

function closePopup() {
    // Hide the pop up
    document.getElementById("popup").style.display = "none";
}

function closePopup2() {
    // Hide the pop up
   document.getElementById("popup2").style.display = "none";
}

function submitReview(idc) {

    var voto = document.getElementById("votoInput").value;
    var commento = document.getElementById("commentoInput").value;
    var json = {idc: idc, voto: voto, commento: commento}
    console.log(json);
    if (voto >= 1 && voto <=10 && commento.tirm!="") {
        request.mySql(PhpRequest.DB.InserisciRecensione, "POST", json);
        closePopup2();
    }
    else {
        alert("Inserisci un voto da 1 a 10 e un commento");
    }

}
