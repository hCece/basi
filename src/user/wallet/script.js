var request = new PhpRequest();
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
//call the procedure CreditoPortafoglio and get the credit related to the user
request.mySql(PhpRequest.Portafoglio.Credito,  {user: user});
var response = request.getResponse();
document.getElementById("creditoValue").textContent = response; //set the credit value

//call the procedure CodicePortafoglio and get the code related to the user
request.mySql(PhpRequest.Portafoglio.Codice,  {user: user});
response = request.getResponse();
document.getElementById("codiceValue").textContent = response; //set the code value
var code = response;


//this function checks if the card length is correct and if the amount is bigger than 0
function handleRicarica() {
    var card = document.getElementById("ncarta").value;
    var amount = document.getElementById("importo_euro").value;

    //if checks are correct call RicaricaPortafoglio procedure and add the ricarica to the db
    if(card != "" &&  card.length == 16 && amount>0) {
        request.mySql(PhpRequest.Portafoglio.Ricarica,
         {codp: response, amount : amount, card : card});
        console.log(request.getResponse());
        alert("Ricarica eseguita con successo");
        location.reload();
    }
    else{
        alert("Inserisci un numero di carta e un importo valido (inserire un numero carta di 16 caratteri)");
    }
}

function handleStorico() {

  const update = new Update();
  const tableBody = document.getElementById("popTable");

  update.table(tableBody, PhpRequest.Portafoglio.StoricoR);

  const rows = tableBody.getElementsByTagName("tr");

  // Iterate over the table rows in reverse order
  for (let i = rows.length - 1; i >= 0; i--) {
    const cell = rows[i].getElementsByTagName("td")[1]; // The second column (index 1) contains the value "portafoglio"
    const portafoglio = cell.textContent.trim();

    // Check if the "portafoglio" value is different from the provided "code"
    if (portafoglio.trim() !== code.toString().trim()) {
      // Delete the row if the condition is true
      tableBody.deleteRow(i);
    }
  }

  document.getElementById("popup").style.visibility = "visible";
}


function closePopup() {
   // Hide the pop up
   document.getElementById("popup").style.visibility = "hidden";
}
// convert euro to Tcoin (amount multiplied by 3)
function calculate() {
    const input = document.getElementById('importo_euro');
    const value = input.value * 3;
    document.getElementById('output').textContent = value;
}