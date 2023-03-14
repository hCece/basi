var phpRequest = PhpRequest();


function handleLoginButton() {

    var user = document.getElementById("user").value;
    var pass = document.getElementById("pass").value;
    var json = {user:user,pass:pass}
    phpRequest.makeRequest("riconosciUtente.php", "POST", json);
    var lol = phpRequest.getResponse();

    
    console.log(lol);

    switch(lol){
        case "cliente":
            window.location.href = "http://localhost:4000/phpTEST/src/bookRide/index.php"
            break;
        case "tasssista":
            //carica pagina tassista
            break;
        case "ammministratore":
            //carica pagina amministratore
            break;
        case "unregistered":
            document.getElementById("fuck").style.visibility = "visible";    
    }


   /* if(phpRequest.getResponse() != null)
        window.location.href = phpRequest.getResponse();
*/


}

