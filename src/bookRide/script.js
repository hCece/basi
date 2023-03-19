var googleMap = googleMaps();
var phpRequest = PhpRequest();
var locationStart,locationEnd,map;

//Just a boring handler. It gets the Location object, 
// takes the coordinates of those location and makes a request to the server.
// The response is printed onto html 
function handleSubmitButton() {
  locationStart = googleMap.getStartPlace();
  locationEnd =  googleMap.getEndPlace();

  if (locationStart ==null || locationEnd == null) {
    window.alert("Please enter valid locations.");
    return;
  }

  var startCoordinates = getCoordinates(locationStart);
  var endCoordinates = getCoordinates(locationEnd);

  prettyZoom();
  json = {LatBegin:startCoordinates[0],LongBegin:startCoordinates[1],
    LatEnd:endCoordinates[0],LongEnd:endCoordinates[1]}
  phpRequest.makeRequest("distance.php", "POST", json);
  document.getElementById("distance").innerHTML=phpRequest.getResponse();

}

//it gets the coordinatats of an json-object Location. the coordinate has a highest possible 
// value and a lowest. Here the avg of both taken
function getCoordinates(location){
  const coordinates = [];
  console.log(location);
  tmp = location.geometry.viewport.Ja;
  coordinates[0] = (tmp.hi + tmp.lo) / 2;  
  tmp = location.geometry.viewport.Va;
  coordinates[1] = (tmp.hi + tmp.lo) / 2;

  console.log(coordinates);
  return coordinates;
}

//it adjusts zoom and location, so that both markers fit in the same map
function prettyZoom(){
  map = googleMap.getMap();
  const bounds = new google.maps.LatLngBounds();
  bounds.extend(locationStart.geometry.location);
  bounds.extend(locationEnd.geometry.location);
  map.fitBounds(bounds);

}