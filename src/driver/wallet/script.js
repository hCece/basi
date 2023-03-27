var request = new PhpRequest();
let cookies = document.cookie;
console.log(cookies);
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
var credit = request.getResponse();
document.getElementById("creditoValue").textContent = credit;

//call the procedure CodicePortafoglio and get the code related to the user
request.mySql(PhpRequest.DB.CodicePortafoglio, "POST", {user: user});
var code = request.getResponse();
document.getElementById("codiceValue").textContent = code;

function handleBonifico() {

    var iban = document.getElementById("iban").value;
    var amount = document.getElementById("importo_tcoin").value;
    console.log(iban);
    console.log(amount);
    console.log(credit);


    if(amount <= credit && amount > 0 ) {
        console.log("inside if");
        request.mySql(PhpRequest.DB.InserisciBonifico,
        "POST", {codp: code, tcoin : amount, iban : iban});
        alert("Bonifico eseguito con successo");
    }
    else{
        alert("Inserisci un IBAN e un importo valido");
    }
}
// convert Tcoin to euro (amount divided by 3)
function calculate() {
    const input = document.getElementById('importo_tcoin');
    const value = parseFloat((input.value / 3).toFixed(2));
    //const output =
    document.getElementById('output').textContent = value;
  }