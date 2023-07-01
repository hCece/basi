request = new PhpRequest();

let cookies = document.cookie;

var sp = cookies.split(';'); // here we split the cookies by semicolon and
var user = null;            //look for the cookie with username
for (var i = 0; i < sp.length; i++) {
  var cookie = sp[i].trim();
  if (cookie.indexOf('user=') == 0) {
    user = cookie.substring('user='.length);

    break;
  }
}
document.getElementById("title").textContent = "Lista delle corse eseguite da " + user;

//when page is requested fill the table by StoricoCorse procedure
window.onload = function () {

  const update = new Update();
  const tableBody = document.getElementById("table-body"); // Get the tbody element
   //gets rides related to the user
  update.table(tableBody,PhpRequest.Corsa.Storico,{user:user});

  var results =[];
  for (let i = 0; i < tableBody.rows.length; i++) {

    // Get the username from the last column in each row
    const user = tableBody.rows[i].cells[5].innerText;
    // make request here and set response to variable x
    // you can use the PhpRequest.mySql method to make the query
    request.mySql(PhpRequest.Utente.GetTel,  { user: user });
    const tel = request.getResponse(); // store the result in a variable
    // create a new cell for the tel column and add the value
    const telCell = tableBody.rows[i].insertCell(-1);
    telCell.innerText = tel;

    var idc = tableBody.rows[i].cells[0].innerText;
     //Recensione.Visualizza gets the review's values (empty = no review)
    request.mySql(PhpRequest.Recensioni.Visualizza,  {idc: idc});
    results[i] = request.getResponse(); //fill results array with procedure output

    //now add a button at the end of each row
    // create a new cell for the button
    const cell = tableBody.rows[i].insertCell(-1);
    // create a new button element
    const button = document.createElement("button");
    //check the result and set button properties
    if (results[i] && results[i].trim() != ""){
            button.innerText = "Visualizza Commento";
            button.addEventListener("click", function() {
            openPopup(results[i],tableBody.rows[i].cells[0].innerText);
        });
    }
    else{
            button.innerText = "Inserisci Recensione";
            button.id = idc;
            button.addEventListener("click", function() {
            openPopup(null,tableBody.rows[i].cells[0].innerText);
        });
    }
    // add the button to the cell
    cell.appendChild(button);
  }
}

//if the ride contains a review show popup1

function openPopup(response,idc) {
    if (response && response.trim() !== "") {
      var sp=response.split('-')
      // Set the text of the span elements in the popup
      document.getElementById("Votovalue").textContent = sp[0];
      document.getElementById("Commentovalue").textContent = sp[1];
      document.getElementById("popup1").style.display = "block";
    }
    else {
      //else show popup2 and ask the user to compile the labels
      const popup = document.getElementById("popup2");
      document.getElementById("popup2").style.display = "block";
      const submitBtn = document.getElementById("submit");
      submitBtn.addEventListener("click", function() {
      // call the submitReview() function with the appropriate IDC value
         submitReview(idc);
      });
    }
}

function closePopup1() {
    // Hide the pop up
    document.getElementById("popup1").style.display = "none";
}

function closePopup2() {
    // Hide the pop up
   document.getElementById("popup2").style.display = "none";
}

//this function checks if the user has entered correctly the values and executes the procedure to add the review to the db
function submitReview(idc) {
    var voto = document.getElementById("votoInput").value;
    var commento = document.getElementById("commentoInput").value;
    var json = {idc: idc, voto: voto, commento: commento}

    if (voto >= 1 && voto <=10 ) {
        request.mySql(PhpRequest.Recensioni.Inserisci,  json);
        btn = document.getElementById(idc);
        btn.innerText = "Visualizza Commento";
        alert("Recensione inserita correttamente");
        closePopup2();
        window.location.href = "index.php"; //refresh the page
    }
    else {
        alert("Inserisci un voto da 1 a 10 e un commento");
    }

}
