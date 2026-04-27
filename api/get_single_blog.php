<?php
// api/get_single_blog.php
header('Content-Type: application/json');
require 'db.php';

$id = $_GET['id'] ?? '';
if (!$id) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing ID']);
    exit;
}

try {
    $stmt = $pdo->prepare('SELECT * FROM blogs WHERE id = ?');
    $stmt->execute([$id]);
    $blog = $stmt->fetch();
    
    if ($blog) {
        echo json_encode($blog);
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'Blog not found']);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database error']);
}
?>
