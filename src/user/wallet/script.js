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
    }
    else{
        alert("Inserisci un numero di carta e un importo valido (inserire un numero carta di 16 caratteri)");
    }
}

// convert euro to Tcoin (amount multiplied by 3)
function calculate() {
    const input = document.getElementById('importo_euro');
    const value = input.value * 3;
    document.getElementById('output').textContent = value;
}