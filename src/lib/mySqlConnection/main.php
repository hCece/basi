<?php 

    $servername = "localhost";
    $username = "root";
    $password = "pass0";
    $dbname = "taxiserver";
    $conn = new mysqli($servername, $username, $password, $dbname);
function call_stored_procedure($input_variables, $procedure_name, $hasOutput) {

    global $conn;
    // Prepare input variables
    $input_params = "";
    $input_values = array();
    foreach ($input_variables as $tmp_var) {
        if (isset($_POST[$tmp_var])) {
            $input_params .= "?,";
            array_push($input_values, $_POST[$tmp_var]);
        } else {
            // If any input variable is missing, return an empty array
            $conn->close();
            return null;
        }
    }
    $input_params = rtrim($input_params, ",");

    if($hasOutput){
    $stmt = $conn->prepare("CALL $procedure_name($input_params,@output)");
    }else{
        $stmt = $conn->prepare("CALL $procedure_name($input_params)");
    }
    $stmt->bind_param(str_repeat("s", count($input_variables)), ...$input_values);
        //the three dots are called a "splat" operataor. It decomposes a array to single values and passes each a an individual one
    //for more info check https://www.hashbangcode.com/article/splat-operator-php
    $stmt->execute();
    $output=null;
    if($hasOutput){
        // Retrieve output variable
        $result = $conn->query("SELECT @output");
        $row = $result->fetch_assoc();
        $output = $row["@output"];
    }

    // Close MySQL connection
    $conn->close();

    return $output;
}


  


?>