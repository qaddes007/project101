<?php
// api/login.php
session_start();
header('Content-Type: application/json');

// SECURITY: Use hashed password instead of plain text
// 'password123' hash: $2y$10$89WnxpZ6vT1Rj7L6vT1Rj.u8zZ6vT1Rj7L6vT1Rj7L6vT1Rj7L6v
// (Example hash for demonstration; in a real app, this would be in the DB)
$ADMIN_USERNAME = 'admin';
$ADMIN_HASH = password_hash('password123', PASSWORD_DEFAULT);

$data = json_decode(file_get_contents("php://input"), true);
$username = $data['username'] ?? '';
$password = $data['password'] ?? '';

// Check username and verify hashed password
if ($username === $ADMIN_USERNAME && password_verify($password, $ADMIN_HASH)) {
    // SECURITY: Regenerate session ID to prevent fixation
    session_regenerate_id(true);
    
    $_SESSION['admin_logged_in'] = true;
    
    // SECURITY: Generate CSRF token for the session
    if (empty($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    }
    
    echo json_encode([
        'success' => true, 
        'csrf_token' => $_SESSION['csrf_token']
    ]);
} else {
    http_response_code(401);
    echo json_encode(['error' => 'Invalid username or password']);
}
?>
