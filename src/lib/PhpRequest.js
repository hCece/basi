var phpResponse;

function phpRequest(){
    //Uses ajax to make a request.    
    this.getResponse=function(){return phpResponse.trim();};
    this.makeRequest=function(url, type, json) {
        $.ajax({
            url: "../lib/mySqlConnection/" + url,
            type: type,   
            async: false,        
            data: json,
            complete: function (response) {
                populate(response.responseText);
            },
            error: function () {
                populate("There was an error");
            }
       });

       function populate(a) {
        phpResponse = a.trim();
        }
        return false;
    };
  }
  function PhpRequest(){
    return new phpRequest();
  }

