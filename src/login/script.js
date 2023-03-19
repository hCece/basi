var phpRequest = PhpRequest();

/*
    This function is designed to handle the login button. 
    It retrives the data, calls a stored procedure and handles the response
*/
function handleLoginButton() {
    //Retriving data from the two input fields, and parsing them into json
    var user = document.getElementById("user").value;
    var pass = document.getElementById("pass").value;
    var json = {user:user,pass:pass}


    //call "riconosciUtene" and get the return value. The return value will tell what type of user we are dealing with 
    phpRequest.makeMySqlRequest("riconosciUtente", "POST", json);
    var userType = phpRequest.getResponse();
    console.log(userType);

    //If the user is a valid type, the correct kind of start page is loaded, otherwise an error message appears
    switch(userType){
        case "cliente":
            window.location.href = "http://localhost:4000/TAXI/src/dashboard/profile.php"
            break;
        case "tasssista":
            //carica pagina tassista
            break;
        case "ammministratore":
            //carica pagina amministratore
            break;
        case "unregistered":
            document.getElementById("errorLabel").style.visibility = "visible";
            break; 
        default:
            //TODO add server error 
    }


}

