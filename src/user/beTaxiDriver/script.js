

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

  
function handleRegistrationButton(){
    //Retriving data from the two input fields, and parsing them into json
    
    var request = new PhpRequest();


    var user = document.getElementById("newUser").value;
    var pass = document.getElementById("pass").value;
    var brand = document.getElementById("brand").value;
    var model = document.getElementById("model").value;
    var licence = document.getElementById("licence").value;
    var nrSeat = document.getElementById("nrSeat").value;


    if (user && pass && brand && model && licence && nrSeat) {
      var json = {usernameCliente:getCookie("user"),
                  nuovoUsername:user,
                  password:pass,
                  fotoDoc:"LOL",
                  marca:brand,
                  modello:model,
                  targa:licence,
                  posti:nrSeat,
                  lusso:isLuxury(),
                  elettrico:isElectric()};

      request.mySql(PhpRequest.DB.RischiestaLavoro, "POST", json)
      console.log(request.getResponse());
    } else
        alert("Please fill in all fields");


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