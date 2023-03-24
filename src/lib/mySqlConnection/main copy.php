<?php 

    $servername = "localhost";
    $username = "root";
    $password = "pass0";
    $dbname = "taxiserver";
    $conn = new mysqli($servername, $username, $password, $dbname);


/*  This function makes to call genericly stored procedures. 
*/
function execute_stored_procedure($procedure_name, $question_mark, $input_values, $has_output=false) {
    global $conn;
    if($has_output){
        $stmt = $conn->prepare("CALL $procedure_name($question_mark,@output)");
    }else{
        $stmt = $conn->prepare("CALL $procedure_name($question_mark)");
    }    
    /*the three dots are called a "splat" operataor. It decomposes a array to single values and passes each a an individual one
        for more info check https://www.hashbangcode.com/article/splat-operator-php
        E.g. if there are 3 input varables, the input will look as follow:
            bind_param(                 "sss"                 , $input1, $input2, $input3)
    */
    $stmt->bind_param(str_repeat("s", count($input_values)), ...$input_values);

    $stmt->execute();
    $output=null;
    if($has_output){
        $result = $conn->query("SELECT @output");
        $row = $result->fetch_assoc();
        $output = $row["@output"];
    }

    $conn->close();

    return $output;
}

/*  Prepares to make a call to mySql. Params:

- input_variables: a list, in the right order, of the POST values needed for the stored procedure
- procedure_name: the name of the stored procedure that we want to call
- has_output (char) : if the stored procedure returns a value this has to be set to true.
            s --> String return
            i --> integer return
            ...

*/

function stored_procedure_with_post_values($input_variables, $procedure_name, $has_output=false) {
    $data = prepare_input_from_post_values($input_variables);
    if(!$data) return null;
    return execute_stored_procedure($procedure_name, $data['question_mark'], $data['input_values'], $has_output);
}

function call_stored_procedure($input_values, $procedure_name, $has_output=false) {
    $question_mark = create_question_mark_string(count($input_values));
    return execute_stored_procedure($procedure_name, $question_mark, $input_values, $has_output);
}
/*
    This method checks if the variables are set, and sets them in an array of input values, 
    that will be later sent as input for a stored procedure
    question_mark is a list of questions mark useful to make the request, and input_values contains the list of the input variables.
*/
function prepare_input_from_post_values($input_variables) {
    $question_mark = "";
    $input_values = array();
    foreach ($input_variables as $input_var) {
        if (isset($_POST[$input_var])) {
            $question_mark .= "?,";
            array_push($input_values, $_POST[$input_var]);
        } else {
            return null;
        }
    }
    $question_mark = trim($question_mark, ",");
    return array('question_mark' => $question_mark, 'input_values' => $input_values);
}

function create_question_mark_string($num_params) {
    $question_mark = str_repeat("?,", $num_params);
    return trim($question_mark, ",");
}



  


?>