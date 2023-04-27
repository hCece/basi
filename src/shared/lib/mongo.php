<?php

require dirname(dirname(dirname(__DIR__))) . '/vendor/autoload.php'; // include Composer's autoloader
$client = new MongoDB\Client("mongodb://localhost:27017");
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

?>