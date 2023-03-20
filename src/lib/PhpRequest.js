/*
    This class makes requests to the server by calling specific php files that contain stored procedures to call or simple queries
    It uses AJAX to make the requests
*/
var response;
class PhpRequest{

    //Stands for Stored Procedure
    static SP = {
        AggiungiCliente: "aggiungiCliente",
        AggiungiCredenziali: "aggiung iCredenziali",
        CheckCF: "checkCF",
        CheckUsername: "checkUsername",
        RiconosciUtente: "riconosciUtente"
    };

    //Returns the variable "response" 
    getResponse = function () { return response.trim(); };       


    /* Opting to make request via javascript-php instead of the <post> with html-php, get's usefull for more complex use cases of requests, 
        e.g. the Google Maps webpage. The request is performed with JQuery & AJAX. 
        If the function is successfull, the data get's saved on "respone", otherwise an error message populates the variable   
    */    
    mySql = function (storedProcedure, type, json) {
        console.log(storedProcedure)
        // Check if the provided storedProcedure is a valid enum value
        if (!Object.values(SP).includes(storedProcedure)) {
            throw new Error("Invalid stored procedure name");
        }
        
        $.ajax({
            url: storedProcedure,
            type: type,
            async: false,
            data: json,
            complete: function (res) {
                response = res.responseText;
            },
            error: function () {
                phpResponse = "There was an error";
            }
        });
        return false;
    };

    //calls the previous method, but corrects the path where the php file for the queries are found
    makeMySqlRequest = function (url, type, json) {
        url =  "../lib/mySqlConnection/" + url + ".php";
        return this.makeRequest(url, type, json);
    };
}

