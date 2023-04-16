<?php 

//TODO: get data from a file where the pass is stored
function newConnection(){
    $servername = "localhost";
    $username = "root";
    $password = "pass0";
    $dbname = "taxiserver";
    return new mysqli($servername, $username, $password, $dbname);
}
newConnection();



function call_query($query) {
    global $conn;
    if($conn==null)
        $conn = newConnection();
    $result = $conn->query($query);
    if (!$result) return null;
    $output = array();
    while ($row = $result->fetch_assoc()) {
        $output[] = $row;
    }
    $result->free();
    return $output;
}
    
/*  This function is made to call genericly stored procedures. The only sidedown of this method is that it 
    only can return a single variable, instead of multiple return variables possible in mySql to return 
    Following inputs are required:

        - input_variables: a list, in the right order, of the inputs needed for the stored procedure
        - procedure_name: the name of the stored procedure that we want to call
        - has_output (char) : if the stored procedure returns a value this has to be set to true.
                    s --> String return
                    i --> integer return
*/
function call_stored_procedure($input_variables, $procedure_name, $hasOutput=false) {

    global $conn;
    if($conn==null)
        $conn = newConnection();
    // Firstly the input query get's prepared. We retrive the data with the prepare_input variable, 
    // and the the query get's prepared with the question mark string
    $prepared_input = prepare_input($input_variables);
    if(!$prepared_input) return null;

    $input_params = $prepared_input['params'];
    $input_values = $prepared_input['values'];
    if($hasOutput){
        $stmt = $conn->prepare("CALL $procedure_name($input_params,@output)");
    }else{
        $stmt = $conn->prepare("CALL $procedure_name($input_params)");
    }    
    /*  The next line bind's all the values into the query. 
        The three dots are called a "splat" operataor. It decomposes a array to single values and passes each a an individual one
        for more info check https://www.hashbangcode.com/article/splat-operator-php
        E.g. if there are 3 input varables, the input will look as follow:
            bind_param("sss", $input1, $input2, $input3) =  bind_param("sss",...$input_values)
    */
    $stmt->bind_param(str_repeat("s", count($input_variables)), ...$input_values);

    $stmt->execute();
    $output=null;
    if($hasOutput){
        // Retrieve output variable
        $result = $conn->query("SELECT @output");
        $row = $result->fetch_assoc();
        $output = $row["@output"];
    }else{
        $output = "done!";
    }
    
    // ERROR: add this lines if there is an error 
    /*
    while($conn->next_result()) {
        $result = $conn->use_result();
        if($result instanceof mysqli_result) {
            $result->free();
        }
    }
    */

    return $output;
}
/*
    This method checks if the variables are set, and sets them in an array of input values, 
    that will be later sent as input for a stored procedure
    input_params is a list of questions mark useful to make the request, and input_values contains the list of the input variables.
*/
function prepare_input($input_variables) {
    $input_params = "";
    $input_values = array();
    foreach ($input_variables as $tmp_var) {
        if (isset($_POST[$tmp_var])) {
            $input_params .= "?,";
            array_push($input_values, $_POST[$tmp_var]);
        } else {
            return null;
        }
    }
    $input_params = rtrim($input_params, ",");
    return array('params' => $input_params, 'values' => $input_values);
}





  


?>