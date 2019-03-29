<?php

require_once('mysqlconnect.php');

$query = 'SELECT p.`id`, p.`name`, p.`price`,
        i.`url` AS `images`
    FROM `products` AS p
    JOIN `images` AS i
        ON p.`id` = i.`products_id`
    ORDER BY p.`id` DESC'
;

// procedural
$result = mysqli_query($conn, $query);

$data = [];

while($row = mysqli_fetch_assoc($result)) {
    $currentID = $row['id'];

    if ( isset( $data[$currentID] ) ) {
        $data[$row['id']]['images'][] = $row['images'];

        // $currentID = $row['id'];
        // $image = $row['images'];
        $data[$currentID]['images'][] = $image; // new push way
        // array_push($data[$currentID]['images'], $image); // old push way
        // $data[$currentID]['images'][count($date[$currentID]['images'])] = $image;
        // null;
    } else {
        $image = $row['images'];
        unset($row['images']);
        $row['images'][] = $image;

        $row['price'] = intval($row['price']);
        $row['price'] = (int)$row['price'];
        
        $data[$currentID] = $row;
    };
}

$pureData = [];

foreach($data as $value) {
    $pureData[] = $value;
}

exit();

$output = [
    'success' => true,
    'products' => $pureData
];

$json_output = json_encode($output);

print($json_output);
?>