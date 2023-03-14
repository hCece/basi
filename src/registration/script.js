var phpRequest = PhpRequest();

function handleRegistrationButton(){

    var user = document.getElementById("user").value;
    //var pass = document.getElementById("pass").value;
    var firstName = document.getElementById("firstname").value;
    var lastName = document.getElementById("lastname").value;
    var birthday = document.getElementById("birthday").value;
    var city = document.getElementById("city").value;
    var cf = document.getElementById("cf").value;


    var json = {user:user,
                //pass:pass, TODO:add pass
                firstName:firstName,
                lastName:lastName,
                birthday:birthday,
                city:city,
                cf:cf}

    console.log(birthday);

    phpRequest.makeRequest("aggiungiCliente.php", "POST", json);
    console.log(phpRequest.getResponse());

}