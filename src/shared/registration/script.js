

/*
    This function is designed to handle the register button. 
    It retrives the data, calls a stored procedure and handles the response
*/

function handleRegistrationButton(){
    //Retriving data from the two input fields, and parsing them into json
    
    var request = new PhpRequest();


    var user = document.getElementById("user").value;
    var pass = document.getElementById("pass").value;
    var firstName = document.getElementById("firstname").value;
    var lastName = document.getElementById("lastname").value;
    var birthday = document.getElementById("birthday").value;
    var city = document.getElementById("city").value;
    var cf = document.getElementById("cf").value;

    if (user && pass && firstName && lastName && birthday && city && cf) {

        var json1 = {user:user,
                    pass:pass};

        var json2 = {cf:cf,
                    user:user,
                    firstName:firstName,
                    lastName:lastName,
                    birthday:birthday,
                    city:city,
                    cf:cf};


        request.mySql(PhpRequest.SP.CheckUsername, "POST", {user:user});
        var result1 = request.getResponse();

        request.mySql(PhpRequest.SP.CheckCF, "POST", {cf:cf});
        var result2 = request.getResponse();

        if(result1 == 'OK'  && result2 == 'OK'){
            request.mySql(PhpRequest.SP.AggiungiCredenziali, "POST", json1);
            request.mySql(PhpRequest.SP.AggiungCliente, "POST", json2);
            alert("Registration successful, try to login");
            window.location.href = "../login/login.php";
        }else
            alert("Username or Codice Fiscale already exist");
    } else
        alert("Please fill in all fields");


}