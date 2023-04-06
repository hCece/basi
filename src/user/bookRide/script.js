var googleMap = googleMaps();
var request = new PhpRequest();
var locationStart,locationEnd;
let idReservation, reservation;
const COEFFICENTE_PRO = 1.5;




/* The button "submit" has two states: "Prenotazione Corsa" & "Cancella Prenotazione"
 * That are rappresented with the first if in the method. If the button is in delete reservation mode, 
 * the method deletes the previously made reservation, otherwise it will make a reservation and 
 * check each 5 seconds if the reservation has been approved by a taxidriver
 */
function handleSubmitButton() {
  
  let btn = document.getElementById("submit-button");
  if(btn.innerHTML === "Prenotazione Corsa"){
    setLocations();
    idReservation = doReservation();
    if(idReservation < 0) return;

    btn.innerHTML = "Cancella Prenotazione";

    interval = setInterval(function () {
      if(isRideApproved()){
        alert("La corsa è stata presa in carico. un tassista arriverà a breve");
        clearInterval(interval);    
        btn.innerHTML = "Prenotazione Corsa";
      }

    }, 5000);

  }else{
    console.log(idReservation + "id Prenotazione");
    request.mySql(PhpRequest.Prenotazione.Elimina, "POST",{user:getCookie('user')} );
    btn.innerHTML = "Prenotazione Corsa";
    clearInterval(reservation);
  }
}

//Checks if the reservation has been picked up by a rider with "si corsa".
//When the reservation has been picked up by a rider, the user's reservation get's deleted
function isRideApproved(){
  request.mySql(PhpRequest.Prenotazione.isCompletata, "POST",{user:getCookie('user')} );
  const responseData = request.getResponse();
  if (responseData == "si corsa") {
    request.mySql(PhpRequest.Prenotazione.Elimina, "POST",{user:getCookie('user')} );
    return true;
  }
  return false;
}

// This method prepares the json file to send to the server, and makes the request to book a new ride  
function doReservation(){
  startCity = googleMap.getCityFromLocation(locationStart);
  endCity = googleMap.getCityFromLocation(locationEnd);

  nrSeat = document.getElementById("nrSeat").value;
  if(!nrSeat) nrSeat = 1;


  var json = {
    pro :isProCar(),
    partenza:startCity,
    arrivo:endCity,
    nrPosti:nrSeat,
    usernameCliente:getCookie("user"),
    lus:isLuxury(),
    ele:isElectric(),
    costo:getCost()};

  console.log(json);  
  request.mySql(PhpRequest.Prenotazione.Inserisci, "POST", json);
  let idRes = request.getResponse();
  console.log(idRes)
  if(idRes==-200)
    alert("Non esistono dei tassisti con le tue specifiche richieste che partono da " + startCity);
  else if(idRes==-400)
    alert("Non hai abbastanza denaro per prenotare la corsa fino a " + endCity);


  return idRes;

}


function setLocations(){
  locationStart = googleMap.getStartPlace();
  locationEnd =  googleMap.getEndPlace();
  if (locationStart ==null || locationEnd == null) {
    window.alert("Please enter valid locations.");
    return;
  }

}


function isProCar(){
  if(isElectric() && isLuxury()) 
    return 1;
  return 0;
}

function isElectric(){
  if(document.getElementById("electric").checked)
    return 1;
  return 0;

}
function isLuxury(){
  if(document.getElementById("luxury").checked)
    return 1;
  return 0;

}


function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

//

function getCost(){
  var startCoordinates = googleMap.getStartCoordinates(locationStart);
  var endCoordinates = googleMap.getEndCoordinates(locationEnd);
  prettyZoom();
  json = {LatBegin:startCoordinates[0],LongBegin:startCoordinates[1],
    LatEnd:endCoordinates[0],LongEnd:endCoordinates[1],isPro:isProCar()};

  request.request("../lib/distance.php", "POST", json);
  return Number(request.getResponse());

}

//it adjusts zoom and location, so that both markers fit in the same map
function prettyZoom(){
  map = googleMap.getMap();
  const bounds = new google.maps.LatLngBounds();
  bounds.extend(locationStart.geometry.location);
  bounds.extend(locationEnd.geometry.location);
  map.fitBounds(bounds);

}