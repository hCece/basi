    /*  This class makes requests to the server by calling specific php files that 
        contain stored procedures to call or queries. It uses AJAX to make the requests.
        Opting to make request via javascript-php instead of the <post> with html-php, get's
        usefull for more complex use cases of requests, e.g. the Google Maps webpage on user/bookRide.  
    */
    var response;
    var scriptPath = document.currentScript.src;
    const DATABASE_PATH = scriptPath.substring(0, scriptPath.lastIndexOf("/") + 1) + "mySqlConnection/database.php";

    class PhpRequest{

        //This Enum is requaired to make a call to the server. It is there to ensure that whoever uses
        //an instance of the class won't call a wrong file.
        static Cliente = {
            Top: "topClienti",
            Aggiungi: "aggiungiCliente",
        }


        static Utente = {
            Aggiungi: "aggiungiCredenziali",
            Check: "checkUsername",
            Riconosci: "riconosciUtente",
            CheckCF: "checkCF",
        }

        static Portafoglio = {
            Bonifico: "inserisciBonifico",
            Ricarica: "ricaricaPortafoglio",
            Credito: "creditoPortafoglio",
            Codice: "codicePortafoglio",
            StoricoB: "storicoBonifici",
            StoricoR: "storicoRicariche",
        }
        
        static Richiesta = {
            Set: "inserisciRichiestaLavoro",
            Get: "getRichiestaLavoro",
            Approva: "approvaRichiesta",
            Rifiuta: "rifiutaRichiesta",
        }

        static Prenotazione = {
            isCompletata: "prenotazioneCompletata",
            Elimina: "eliminaPrenotazione",
            Inserisci: "inserisciPrenotazione",
        }


        static Corsa = {
            Storico : "storicoCorse",
            Disponibili: "corseDisponibili",
            CountDisponibili: "countCorseDisponibili",
            Aggiungi: "aggiungiCorsa"

        }

        static Recensione = {
            Migliori: "recensioniMigliori",
            Peggiori: "recensioniPeggiori",
            Inserisci: "inserisciRecensione",
            Storico: "storicoRecensioni",
            Visualizza: "visualizzaRecensione",
        }

        static Richiami = {
            Storico : "storicoRichiami",
            Inserisci: "inserisciRichiamo",
            Tassista : "richiamiTassista",
        }


        //Returns the variable "response" 
        getResponse = function () { return response; };       


        /*
        The request is performed with JQuery & AJAX. If the function is successfull, 
        the data get's saved on "respone", otherwise an error message populates the variable    
        */
        request = function (url, type, json) {
            console.log(url);
            // Check if the provided storedProcedure is a valid enum value
            $.ajax({
                url: url,
                type: type,
                async: false,
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
                error: function (err) {
                    console.log(err);
                    phpResponse = "There was an error";
                }
            });
            return false;
        };


        mySql = function (storedProcedure, type, json) {
            // A one-liner that use the Object.values() method to get an array
            // of the values in the PhpRequest object and check if the
            // storedProcedure parameter exists in that array
            if (!Object.values(PhpRequest).some
                            (obj => Object.values(obj).includes(storedProcedure))) 
                throw new TypeError("Invalid stored procedure name");
            //Adds the path where the php files are found
            var url = DATABASE_PATH + "?function="+ storedProcedure;
            this.request(url, type, json);
        };
        


    }

