<?php
// api/get_blogs.php
header('Content-Type: application/json');
require 'db.php';

try {
    $stmt = $pdo->query('SELECT id, title, category, read_time, image, excerpt, created_at FROM blogs ORDER BY created_at DESC');
    $blogs = $stmt->fetchAll();
    echo json_encode($blogs);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to fetch blogs']);
}
?>
