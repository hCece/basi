request = new PhpRequest();

let cookies = document.cookie;

var sp = cookies.split(';'); // here we split the cookies by semicolon and
var user = null;            //look for the cookie with username
for (var i = 0; i < sp.length; i++) {
  var cookie = sp[i].trim();
  if (cookie.indexOf('user=') == 0) {
    admin = cookie.substring('user='.length);
    console.log(admin);
    break;
  }
}

window.onload = function () {
//when the page is requested fill the table-body by StoricoRichiami store procedure
    const updateTable = new UpdateTable();
    const tableBody = document.getElementById("table-body");
    updateTable.update(tableBody,PhpRequest.DB.StoricoRichiami);
    var results = [];
    for (let i = 0; i < tableBody.rows.length; i++) {
        request.mySql(PhpRequest.DB.RichiamiTassista, "POST", //this procedure gets recalls related to an user
        {user: tableBody.rows[i].cells[0].innerText}); //here we are passing usernameTassista that is in first column of each row
        results[i] = request.getResponse();

        //then add a button of the and of each table row
        // create a new cell for the button
        const cell = tableBody.rows[i].insertCell(-1);
        // create a new button element
        const button = document.createElement("button");
        //if result is not empty create a clickable button to show the recall/s
        if(results[i] && results[i].trim() != "") {
           button.innerText = "Visualizza richiami";
           button.style.background= '#6a64f1';
           button.style.cursor = 'pointer';
           button.addEventListener("click", function() {
              //on click call the openPopup function with the appropriate username
              openPopup1(results[i]);
           });
        }else{
          //if response is empty set grey not cickable button
           button.innerText = "Nessun richiamo";
           button.style.background = "grey";
        }
        // add the button to the cell
        cell.appendChild(button);
    }
    //then we add another button on the end of each row
    //this one is the same for all users so we don't do any checks
    for (let i = 0; i < tableBody.rows.length; i++) {

          const cell = tableBody.rows[i].insertCell(-1);
          const button = document.createElement("button");
          button.innerText = "Inserisci richiamo";
          button.style.background= '#6a64f1';
          button.style.cursor = 'pointer';

          button.addEventListener("click", function() {
            //on click call the openPopup function with the appropriate user
            openPopup2(tableBody.rows[i].cells[0].innerText);
          });

          cell.appendChild(button);
    }
}

//Popup1 shows the list of recalls related to an user
function openPopup1(results) {

    console.log(results);

    //const tableBody = document.getElementById("pop1Table");



  const table = document.getElementById("tab");
  const tbody = table.querySelector("pop1Table");
/*
  for (let i = 0; i < results.length; i++) {
    const result = results[i];
    const row = document.createElement("tr");
    const id = document.createElement("td");
    id.textContent = result.IDRICHIAMO;
    const admin = document.createElement("td");
    admin.textContent = result.usernameAmministratore;  //codice di chat gpt non funziona un cazzo
    const tassista = document.createElement("td");
    tassista.textContent = result.usernameTassista;
    const comment = document.createElement("td");
    comment.textContent = result.commento;
    const date = document.createElement("td");
    date.textContent = result.data;

    row.appendChild(id);
    row.appendChild(admin);
    row.appendChild(tassista);
    row.appendChild(comment);
    row.appendChild(date);

    tbody.appendChild(row);
  }

  table.appendChild(tbody);
  */
      //TODO result e' corretto bisogna solo inserirlo nella tabella senza usare UpdateTable


    document.getElementById("popup1").style.display = "block";
}
 //Popup2 shows an interface where the administrator can add a recall
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

//this function checks is commento is valid and then
//calls InserisciRichiamo stored procedure to insert thr review in the db
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

