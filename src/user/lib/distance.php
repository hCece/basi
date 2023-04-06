<?php

/*  
This block of code makes a request to the apenrouteservice API, by sending the GPS location of two points. 
The API returns a complete route on how to get from the staring point to the location by car. 
Two information, the time taken and the total distance, are information that are sent back to whoever calls this file.

The request is made server side reather then client side (with js) to respect the Cross-site request forgery (CSRF).
There is a .txt file with a brief example on how CSRF could be used by hackers.

*/
define('COEFFICENTE_PRO', 1.5);
$coor = areCoordinatesSet();

//if all variables are set, it returns an array with the variable in the right order to make the openroute request
function areCoordinatesSet(){
    if (
        isset($_POST['LatBegin']) && isset($_POST['LongBegin']) &&
        isset($_POST['LatEnd']) && isset($_POST['LongEnd']) && isset($_POST['isPro']))
    {
        return array($_POST['LatBegin'], $_POST['LongBegin'], $_POST['LatEnd'], $_POST['LongEnd']);
    }
    return false;
}

if ($coor) {
    $maxAttempts = 5;
    $attempt = 0;
    //preparing the full url to send the request
    $key = "5b3ce3597851110001cf624873dc346c76374d94beef5de74df08794";
    $baseUrl = "https://api.openrouteservice.org/v2/directions/driving-car?api_key=" . $key;
    $fullUrl = "". $baseUrl ."&start=". $coor[0].",".$coor[1]."&end=".$coor[2].",".$coor[3];

    while ($attempt < $maxAttempts) {
        // prepering a request to the openrouteservice API
        $ch = curl_init();
        $apiSpec = array("Accept: application/json, application/geo+json; charset=utf-8");

        curl_setopt($ch, CURLOPT_URL, $fullUrl);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
        curl_setopt($ch, CURLOPT_HEADER, FALSE);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $apiSpec);

        //Execute the request and retrive the response
        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        /*
        If the response code is 200 (that means that the response is successfull), 
        the distance in kilometer and the duration in minutes is retrived, added and multiplied with the coefficient if it's a pro car   
        */
        if ($httpCode == 200) {
            $jsonObject = json_decode($response);
            $distance = intval(($jsonObject->features[0]->properties->segments[0]->distance) / 1000);
            $duration = intval(($jsonObject->features[0]->properties->segments[0]->duration) / 60);
            
            $cost = intval($distance)+intval($duration);
            if($_POST['isPro'])
                $cost *= COEFFICENTE_PRO;
            echo $cost;
            break; // exit loop if a successful response is received
        } else {
            /*
            If the request was unsuccessfull a new request is made after a second. 
            Sometimes the service could fail, therefore it's good practice making a few attempts before returing a error message
            */
            $attempt++;
            if ($attempt < $maxAttempts) {
                sleep(1); // wait for 1 second before retrying
            }
        }
    }

    if ($attempt >= $maxAttempts) {
        echo "Failed to retrieve distance after $maxAttempts attempts.";
    }
}


?>