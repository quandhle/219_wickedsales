<?php

require_once('functions.php');
set_exception_handler('handleError');
require_once('config.php');
require_once('mysqlconnect.php');

$output = [
    'success' => false
];

$json_input = file_get_contents("php://input");

$input = json_decode($json_input, true);

$user = $input['email'];
$password = $input['password'];


if (empty($input['email'])) {
    throw new Exception('Please enter email.');
};

if (empty($input['password'])) {
    throw new Exception('Please enter password.');
};

$email = $input['email'];
$password = $input['password'];

$email = addslashes($email);

$hashedPassword = sha1($password);

unset($input['password']);

$query = "SELECT
        `id`, `name`
    FROM `users`
    WHERE `email` = '$email' AND `password` = '$hashedPassword'
";

$result = mysqli_query($conn, $query);

if (!$result) {
    throw new Exception(mysqli_error($conn));
};

if (mysqli_num_rows($result) !== 1) {
    throw new Exception('Invalid username or password.');
};

$data = mysqli_fetch_assoc($result);
$token = $email . $data['id'] . microtime();
$token = sha1($token);

$connect_query = "INSERT INTO
        `user_connections`
    SET
        `token` = '$token',
        `users_id` = {$data['id']},
        `created` = NOW(),
        `ip_address` = '{$_SERVER['REMOTE_ADDR']}'
";

$connect_result = mysqli_query($conn, $connect_query);

if (!$connect_result) {
    throw new Exception(mysqli_error($conn));
};

if (mysqli_affected_rows($conn) !== 1) {
    throw new Exxception('Cannot log in: connection not saved.');
};

$_SESSION['user_data'] = [
    'id' => $data['id'],
    'username' => $data['name'],
    'token' => $token
];

$output['success'] = true;
$output['username'] = $data['name'];
$output['token'] = $token;

$json_output = json_encode($output);

print($json_output);
