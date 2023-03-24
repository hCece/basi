var googleMap = googleMaps();
var locationStart,locationEnd,map;
const COEFFICENTE_PRO = 1.5;
// ------------ NOT UPDATED COMMENT -------------
//Just a boring handler. It gets the Location object, 
// takes the coordinates of those location and makes a request to the server.
// The response is printed onto html 
function handleSubmitButton() {
  var request = new PhpRequest();
  setLocations();
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
    ele:isElectric()};

  console.log(json);
  request.mySql(PhpRequest.DB.InserisciPrenotazione, "POST", json);
  
  var costo = getCost(request);
  console.log("Costo corsa: " + costo + " €");


  
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


function getCost(request){
  
  var startCoordinates = googleMap.getStartCoordinates(locationStart);
  var endCoordinates = googleMap.getEndCoordinates(locationEnd);


  prettyZoom();
  json = {LatBegin:startCoordinates[0],LongBegin:startCoordinates[1],
    LatEnd:endCoordinates[0],LongEnd:endCoordinates[1]};

  request.request("distance.php", "POST", json);
  rtrn = request.getResponse().split(";");
  var costo = Number(rtrn[0])+Number(rtrn[1]);

  if (isProCar()) costo *= COEFFICENTE_PRO;
  
  return costo;
}

//it adjusts zoom and location, so that both markers fit in the same map
function prettyZoom(){
  map = googleMap.getMap();
  const bounds = new google.maps.LatLngBounds();
  bounds.extend(locationStart.geometry.location);
  bounds.extend(locationEnd.geometry.location);
  map.fitBounds(bounds);

}