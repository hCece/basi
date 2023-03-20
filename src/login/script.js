

/*
    This function is designed to handle the login button. 
    It retrives the data, calls a stored procedure and handles the response
*/
function handleLoginButton() {
    var request = new PhpRequest();

    //Retriving data from the two input fields, and parsing them into json
    var user = document.getElementById("user").value;
    var pass = document.getElementById("pass").value;
    var json = {user:user,pass:pass}

    console.log(document.cookie); // expected output: username=Debra White; userId=wjgye264s

    //call "riconosciUtene" and get the return value. The return value will tell what type of user we are dealing with 
    request.mySql(PhpRequest.SP.RiconosciUtente, "POST", {user:user});
    var userType = request.getResponse();
    console.log(userType);

    //If the user is a valid type, the correct kind of start page is loaded, otherwise an error message appears
    switch(userType){
        case "cliente":
            setLoginCookies();
            window.location.href = "../dashboard/profile.php";
            break;
        case "tassista":
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


    //TODO: it's not save to store the password in cookies. We could implement a more secure version
    // https://stackoverflow.com/questions/2100356/is-it-secure-to-store-passwords-in-cookies
    function setLoginCookies(){
        document.cookie = "user="+user +"; path=/";
        document.cookie = "pass="+pass + "; path=/"; 
    }


}

