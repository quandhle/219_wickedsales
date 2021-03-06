<?php

require_once('functions.php');
set_exception_handler('handleError');
require_once('config.php');
require_once('mysqlconnect.php');

$output = [
    'success' => false
];

if (empty($_SESSION['cart_id'])) {
    $output['success'] = true;
    $output['itemCount'] = 0;
} else {
    $cartId = $_SESSION['cart_id'];
    $user_id = $_SESSION['user_id'];

    $count_query = "SELECT
            `item_count`
        FROM `cart`
        WHERE `id` = $cartId
        AND `user_id` = $user_id
    ";

    $count_result = mysqli_query($conn, $count_query);

    if (!$count_result) {
        throw new Exception(mysqli_error($conn));
    };

    if (mysqli_num_rows($count_result) === 0) {
        $output = [
            'success' => true,
            'itemCount' => 0
        ];

        print(json_encode($output));
        
        exit();
    };

    $row = mysqli_fetch_assoc($count_result);
    
    $output['success'] = true;
    $output['itemCount'] = (int)$row['item_count'];
};

print(json_encode($output));
