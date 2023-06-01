<?php

require dirname(dirname(dirname(__DIR__))) . '/vendor/autoload.php'; // include Composer's autoloader


$port = getPortFromSettings();
$client = new MongoDB\Client("mongodb://localhost:".$port);
$collection = $client->basi->logs;

function insert_log($username, $message)
{
    global $collection;
    $date = new DateTime("now", new DateTimeZone('Europe/Rome'));
    $log = [
        'username' => $username,
        'timestamp' => $date->format('Y-m-d H:i:s'),
        'message' => $message
    ];

    $result = $collection->updateOne(
        ['_id' => 'all_logs'],
        ['$push' => ['logs' => $log]],
        ['upsert' => true]
    );
    return $result->getUpsertedCount();
}


function read_log($username = null)
{
    global $collection;
    $output = "";

    $result = $collection->findOne(['_id' => 'all_logs']);
    foreach ($result['logs'] as $log) {
        if ($log['username'] != $username && $username != null)  continue;
        $output .= $log['username'] . " - " . $log['message'] . " : " . $log['timestamp'] . "<br>";
    }
    
    return $output;
}


function getPortFromSettings() {
    // Get the file path
    $filepath = __DIR__ . '/../../../settings.txt';
    
    // Read the file
    $fileContents = file($filepath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    
    // Extract the port value
    $port = '';
    foreach ($fileContents as $line) {
        $line = trim($line); // Trim whitespace from the line
        if (strpos($line, 'port=') === 0) {
            $port = trim(substr($line, 5));
            break;
        }
    }
    
    return $port;
}

?>