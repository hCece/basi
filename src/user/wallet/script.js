var request = new PhpRequest();
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
//call the procedure CreditoPortafoglio and get the credit related to the user
request.mySql(PhpRequest.DB.CreditoPortafoglio, "POST", {user: user});
var response = request.getResponse();
document.getElementById("creditoValue").textContent = response;

//call the procedure CodicePortafoglio and get the code related to the user
request.mySql(PhpRequest.DB.CodicePortafoglio, "POST", {user: user});
response = request.getResponse();
document.getElementById("codiceValue").textContent = response;

function handleRicarica() {
    console.log("Ricarica");
    console.log("Ciao");
    var card = document.getElementById("ncarta").value;
    var amount = document.getElementById("importo_euro").value;
    //var codp = document.getElementById("codiceValue").value;
    console.log(response);

    if(card != "" &&  card.length == 16 && amount>0) {

        console.log(card);
        console.log(amount);
        request.mySql(PhpRequest.DB.RicaricaPortafoglio,
        "POST", {codp: response, amount : amount, card : card});
        alert("Ricarica eseguita con successo");
        window.location.href="../dashboard/profile.php";
    }
    else{
        alert("Inserisci un numero di carta e un importo valido (inserire un numero carta di 16 caratteri)");
    }
}
// convert euro to Tcoin (amount multiplied by 3)
function calculate() {
    const input = document.getElementById('importo_euro');
    const value = input.value * 3;
    //const output =
    document.getElementById('output').textContent = value; // get the output element
   // output.innerText = value; // set the output element's text to the calculated value
  }