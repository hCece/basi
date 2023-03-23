/*
    This class makes requests to the server by calling specific php files that contain stored procedures to call or simple queries
    It uses AJAX to make the requests
*/
var response;
class PhpRequest{

    //Stands for Stored Procedure
    static SP = {
        AggiungiCliente: "aggiungiCliente",
        AggiungiCredenziali: "aggiungiCredenziali",
        CheckCF: "checkCF",
        CheckUsername: "checkUsername",
        RiconosciUtente: "riconosciUtente",
        InserisciPrenotazione: "inserisciPrenotazione"
    };

    //Returns the variable "response" 
    getResponse = function () { return response.trim(); };       


    /* Opting to make request via javascript-php instead of the <post> with html-php, get's usefull for more complex use cases of requests, 
        e.g. the Google Maps webpage. The request is performed with JQuery & AJAX. 
        If the function is successfull, the data get's saved on "respone", otherwise an error message populates the variable   
    */    
    request = function (url, type, json, async) {
        // Check if the provided storedProcedure is a valid enum value
        $.ajax({
            url: url,
            type: type,
            async: async,
            data: json,
            //This could be the solution to a future cookie-updating problem
            //https://stackoverflow.com/questions/10230341/http-cookies-and-ajax-requests-over-https/10249123
            /*
            xhrFields: {
                withCredentials: true
              },
            */
            complete: function (res) {
                response = res.responseText;
            },
            error: function () {
                phpResponse = "There was an error";
            }
        });
        return false;
    };

    repeatedMySql = function(storedProcedure, type, json){
        // Use the private SP enum
        if (!Object.values(PhpRequest.SP).includes(storedProcedure)) {
            throw new TypeError("Invalid stored procedure name");
        }
        var url = "../lib/mySqlConnection/" + storedProcedure + ".php";
        setInterval(request(url, type, json, true), 1000);
    }
    //calls the previous method, but corrects the path where the php file for the queries are found
    mySql = function (storedProcedure, type, json) {
        // Use the private SP enum
        if (!Object.values(PhpRequest.SP).includes(storedProcedure)) {
            throw new TypeError("Invalid stored procedure name");
        }
        var url = "../lib/mySqlConnection/" + storedProcedure + ".php";
        this.request(url, type, json, false);
    };
    
}

