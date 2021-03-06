<?php

ob_start(null, 0, PHP_OUTPUT_HANDLER_CLEANABLE ^ PHP_OUTPUT_HANDLER_REMOVABLE);
require_once('config.php');
ob_end_clean();

$output = [
    'success' => false
];

$json_input = file_get_contents("php://input");
$input = json_decode($json_input, true);

$email = $input['email'];
$password = $input['password'];

if (empty($email)) {
    throw new Exception('Please enter email.');
};

if (empty($password)) {
    throw new Exception('Please enter password.');
};

$hashedPassword = sha1($password);
unset($password);

$query = "SELECT `id`, `last_name`, `first_name`, `cart_id` FROM `user` WHERE `email` = ? AND `password` = ?";

$statement = mysqli_prepare($conn, $query);
mysqli_stmt_bind_param($statement, 'ss', $email, $hashedPassword);
$query_result = mysqli_stmt_execute($statement);

$result = mysqli_stmt_get_result($statement);

if (!$result) {
    throw new Exception(mysqli_error($conn));
};

if (mysqli_num_rows($result) !== 1) {
    throw new Exception('Invalid email or password.');
};

$data = mysqli_fetch_assoc($result);
$user_id = $data['id'];
$token = $email . $user_id . microtime();
$token = sha1($token);

$connect_query = "INSERT INTO
        `user_connection`
    SET
        `token` = '$token',
        `user_id` = {$data['id']},
        `created` = NOW()
";

$connect_result = mysqli_query($conn, $connect_query);

if (!$connect_result) {
    throw new Exception(mysqli_error($conn));
};

if (mysqli_affected_rows($conn) !== 1) {
    throw new Exception('Cannot log in: connection not saved.');
};

$_SESSION['user_data'] = [
    'user_id' => $data['id'],
    'token' => $token,
    'is_guest' => false
];

$data = [
    'login' => true,
    'is_guest' => false,
    'user_id' => $data['id'],
    'cart_id' => $data['cart_id'],
    'first_name' => $data['first_name'],
    'last_name' => $data['last_name'],
    'token' => $data['token']
];

$output['success'] = true;
$output['data'] = $data;

print(json_encode($output));
