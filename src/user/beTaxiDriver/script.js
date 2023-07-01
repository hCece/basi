
var request = new PhpRequest();


  
window.onload = function () {

  request.mySql(PhpRequest.Richiesta.Stato, {});
  let res = request.getResponse();
  console.log(res);
  if(res.trim()== "APERTO"){
    alert("La richiesta sta per essere valutata. Sii paziente");
    window.location.href = "../dashboard/profile.php";
  }else if(res.trim()== "APPROVATO"){
    alert("La richiesta è stata approvata. Inizia ora il tuo nuovo lavoro");
  }

}
function handleRegistrationButton(){
    var cookie = new Cookie();
    //Retriving data from the two input fields, and parsing them into json
    var user = document.getElementById("newUser").value;
    var pass = document.getElementById("pass").value;
    var brand = document.getElementById("brand").value;
    var model = document.getElementById("model").value;
    var licence = document.getElementById("licence").value;
    var nrSeat = document.getElementById("nrSeat").value;

    //check if they are not null
    if (user && pass && brand && model && licence && nrSeat) {
      //prepare json to send to the server
      var json = {usernameCliente:cookie.get("user"),
                  nuovoUsername:user,
                  password:pass,
                  marca:brand,
                  modello:model,
                  targa:licence,
                  posti:nrSeat,
                  lusso:isLuxury(),
                  elettrico:isElectric()};

      console.log(json);
      //make request to the server and add a new job request
      request.mySql(PhpRequest.Richiesta.Set,  json)
      res = request.getResponse().trim();
      if(res=='"ok"'){
        alert("La richiesta sta per essere valutata. Sii paziente");
        window.location.href = "../dashboard/profile.php";
      } else if (res==null)
        alert("Inserisci dei valori validi in tutti i campi");
      else 
        alert(res);
    }

}


function isElectric(){
    if(document.getElementById("electric").checked)
      return 1;
    return 0;
  
  }
  function isLuxury(){
    if(document.getElementById("luxury").checked)
      return 1;
    return 0;
  }