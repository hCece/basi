request = new PhpRequest();

let cookies = document.cookie;

var sp = cookies.split(';'); // here we split the cookies by semicolon and
var user = null;
for (var i = 0; i < sp.length; i++) { //look for the cookie with username
  var cookie = sp[i].trim();
  if (cookie.indexOf('user=') == 0) {
    admin = cookie.substring('user='.length);
    console.log(admin);
    break;
  }
}

window.onload = function () {
    const updateTable = new UpdateTable();
    const tableBody = document.getElementById("table-body"); // Get the tbody element
    updateTable.update(tableBody,PhpRequest.DB.StoricoRichiami);

    for (let i = 0; i < tableBody.rows.length; i++) {
          // create a new cell for the button
          const cell = tableBody.rows[i].insertCell(-1);
          // create a new button element
          const button = document.createElement("button");
          // Get the values of voto and commento from sp.visualizzaRecensione
          request.mySql(PhpRequest.DB.RichiamiTassista, "POST",
          {user: tableBody.rows[i].cells[0].innerText});
          response = request.getResponse();
          console.log(response);
          //if the response is not empty create a button to get the review
          if(response && response != '[]'){
            //set active button properties
             button.innerText = "Visualizza richiami";
             button.style.background= '#6a64f1';
             button.style.cursor = 'pointer';

             button.addEventListener("click", function() {
                //on click call the openPopup function with the appropriate voto and commento value
                openPopup1(tableBody.rows[i].cells[0].innerText);
             });
          }else{
            //set grey not cickable button
             button.innerText = "Nessun richiamo";
             button.style.background = "grey";
          }
          // add the button to the cell
          cell.appendChild(button);
    }

    for (let i = 0; i < tableBody.rows.length; i++) {

          const cell = tableBody.rows[i].insertCell(-1);
          const button = document.createElement("button");
          button.innerText = "Inserisci richiamo";
          button.style.background= '#6a64f1';
          button.style.cursor = 'pointer';

          button.addEventListener("click", function() {
            //on click call the openPopup function with the appropriate voto and commento value
            openPopup2(tableBody.rows[i].cells[0].innerText);
          });

          cell.appendChild(button);
    }
}
function openPopup1(user) {

      const updateTable = new UpdateTable();
      const tableBody = document.getElementById("pop1Table"); // Get the tbody element
      updateTable.update(tableBody,PhpRequest.DB.RichiamiTassista,{user: user});
      document.getElementById("popup1").style.display = "block";
}

function openPopup2(user) {
    const submitButton = document.getElementById("submit");
    submitButton.style.backgroundColor = "#6a64f1";
    submitButton.style.cursor = "pointer";
    submitButton.addEventListener("click", function() {
        // call the submitRecall() function with the appropriate user value
        submitRecall(user);
    });
    document.getElementById("popup2").style.display = "block";
}

function closePopup1() {
   // Hide the pop up
   document.getElementById("popup1").style.display = "none";
}

function closePopup2() {
    // Hide the pop up
    document.getElementById("popup2").style.display = "none";
}

function submitRecall(user) {

    var commento = document.getElementById("descInput").value;
    var json = {admin: admin, user: user, commento: commento}
    console.log(json);
    if (commento && commento.tirm!="") {
        request.mySql(PhpRequest.DB.InserisciRichiamo, "POST", json);
        closePopup2();
    }
    else {
        alert("Inserisci un commento valido");
    }

}

