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
request.mySql(PhpRequest.Portafoglio.Credito, "POST", {user: user});
var credit = request.getResponse();
document.getElementById("creditoValue").textContent = credit;

//call the procedure CodicePortafoglio and get the code related to the user
request.mySql(PhpRequest.Portafoglio.Codice, "POST", {user: user});
var code = request.getResponse();
document.getElementById("codiceValue").textContent = code;

//handle the button click, check if iban is valid
//and if the tcoin amount is greater than 0 and lover than total credit
function handleBonifico() {
    var iban = document.getElementById("iban").value;
    var tcoin = document.getElementById("importo_tcoin").value;

    if(iban.trim != "" && tcoin > 0 && tcoin < Number(credit)+1) {
        request.mySql(PhpRequest.Portafoglio.Bonifico, "POST", {codp:code, tcoin: tcoin, iban: iban});
        alert("bonifico eseguito con successo");
    }
    else{
        alert("Inserisci un iban e un importo valido");
    }
}
// convert tcoin to euro (amount divided by 3)
function calculate() {
    const input = document.getElementById('importo_tcoin');
    const value = input.value / 3;
    document.getElementById('output').textContent = Math.round(value*100)/100;;
  }