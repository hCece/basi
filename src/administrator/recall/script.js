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
    const update = new Update();
    const tableBody = document.getElementById("table-body");
    update.table(tableBody,PhpRequest.Richiami.Storico);
    var results = [];
    for (let i = 0; i < tableBody.rows.length; i++) {
        request.mySql(PhpRequest.Richiami.Tassista, 
        {user: tableBody.rows[i].cells[0].innerText}); //here we are passing usernameTassista that is in first column of each row
        results[i] = request.getResponse();

        //then add a button of the and of each table row
        // create a new cell for the button
        const cell = tableBody.rows[i].insertCell(-1);
        // create a new button element
        const button = document.createElement("button");
        //if result is not empty create a clickable button to show the recall/s
        if(results[i] && results[i].length > 5) {
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

//this function displays a popup containing a table of recall information related to a user
function openPopup1(results) {

    //parse the results parameter from a JSON string to a JavaScript object
        const data = JSON.parse(results);

        //get a reference to the table body
        tableBody = document.getElementById('pop1Table');

        //iterate over each recall in the data array and create a table row for each one
        data.forEach(item => {
            const row = document.createElement('tr');

            // Create a table cell element for the IDRICHIAMO information and add it to the row
            const idCell = document.createElement('td');
            idCell.textContent = item.IDRICHIAMO;
            row.appendChild(idCell);

            // Create a table cell element for the usernameAmministratore information and add it to the row
            const adminCell = document.createElement('td');
            adminCell.textContent = item.usernameAmministratore;
            row.appendChild(adminCell);

            // Create a table cell element for the usernameTassista information and add it to the row
            const taxiDriverCell = document.createElement('td');
            taxiDriverCell.textContent = item.usernameTassista;
            row.appendChild(taxiDriverCell);

            // Create a table cell element for the commento information and add it to the row
            const commentCell = document.createElement('td');
            commentCell.textContent = item.commento;
            row.appendChild(commentCell);

            // Create a table cell element for the data information and add it to the row
            const dateCell = document.createElement('td');
            dateCell.textContent = item.data;
            row.appendChild(dateCell);

            // Add the completed row to the table body
            tableBody.appendChild(row);
        });

    // Display the popup 

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
   document.getElementById("pop1Table").innerHTML = "";
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
        request.mySql(PhpRequest.Richiami.Inserisci,  json);
        alert("Richiamo inserito correttamente");
        closePopup2();
        window.location.href = "index.php"; //refresh the page
    }
    else {
        alert("Inserisci un commento valido");
    }

}

