var request = new PhpRequest();
let cookies = document.cookie;

var sp = cookies.split(';'); // here we split the cookies by semicolon and
var user = null;             //look for the cookie with username
for (var i = 0; i < sp.length; i++) {
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
document.getElementById("creditoValue").textContent = credit; //set credito value

//call the procedure CodicePortafoglio and get the code related to the user
request.mySql(PhpRequest.Portafoglio.Codice, "POST", {user: user});
var cod = request.getResponse();
document.getElementById("codiceValue").textContent = cod; //sed code value

//handle the bonifico button click
function handleBonifico() {
    //get input variables
    var iban = document.getElementById("iban").value;
    var tcoin = document.getElementById("importo_tcoin").value;

    // check if iban is valid and if the tcoin amount is greater than 0 and lover than total credit
    if(iban.trim != "" && tcoin > 0 && tcoin < Number(credit)+1) {
        //insert the bonifico in the db by InserisciBonifico procedure
        request.mySql(PhpRequest.Portafoglio.Bonifico, "POST", {codicePortafoglio:parseInt(cod), tcoin: tcoin, iban: iban});
        alert("bonifico eseguito con successo");
    }
    else{
        alert("Inserisci un iban e un importo valido");
    }
}

function handleStorico() {
    const update = new Update();
    const tableBody = document.getElementById("popTable");
    update.table(tableBody,PhpRequest.Portafoglio.StoricoB,{codicePortafoglio:parseInt(cod)});
    document.getElementById("popup").style.visibility = "visible";
    console.log("displyed");

}



function closePopup() {
   // Hide the pop up
   document.getElementById("popup").style.visibility = "hidden";
   //document.getElementById("popTable").innerHTML = "";
}

// convert tcoin to euro (amount divided by 3)
function calculate() {
    const input = document.getElementById('importo_tcoin');
    const value = input.value / 3;
    document.getElementById('output').textContent = Math.round(value*100)/100;;
  }