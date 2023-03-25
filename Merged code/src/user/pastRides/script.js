request = new PhpRequest();
function openPopup(idc) {
    // Get the values of voto and commento from sp.visualizzaRecensione
    request.mySql(PhpRequest.DB.VisualizzaRecensione, "POST", {idc: idc});
    response = request.getResponse(); //output format: voto - commento
    if (response.length > 0)
    {
        var sp=response.split('-')
        // Set the text of the span elements in the pop up
        document.getElementById("Votovalue").textContent = sp[0];
        document.getElementById("Commentovalue").textContent = sp[1];
    }
    else{
         document.getElementById("Votovalue").textContent = "Nessun voto";
         document.getElementById("Commentovalue").textContent = "Nessun commento";
    }
    // Display the pop up
    document.getElementById("popup").style.display = "block";
}

function closePopup() {
    // Hide the pop up
    document.getElementById("popup").style.display = "none";
}
