var request = new PhpRequest();
let cookies = document.cookie;

var sp = cookies.split(';'); // here we split the cookies by semicolon and
var user = sp[0].split('=')[1];  //get the username from the second cookie
console.log(user);

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
    }
    else{
        alert("Inserisci un numero di carta e un importo valido");
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