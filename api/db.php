<?php
// api/db.php
// Configure your database connection here
$host = 'localhost';
$db   = 'bioboost_db';
$user = 'root'; // default XAMPP username
$pass = '';     // default XAMPP password

$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8mb4", $user, $pass, $options);
} catch (\PDOException $e) {
    // SECURITY: Don't leak detailed error info in production
    http_response_code(500);
    die(json_encode(["error" => "Database connection failed. Please ensure the database is setup correctly."]));
}
?>
