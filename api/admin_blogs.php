<?php
// api/admin_blogs.php
session_start();
header('Content-Type: application/json');

if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    http_response_code(401);
    echo json_encode(['error' => 'Unauthorized']);
    exit;
}

require 'db.php';

$method = $_SERVER['REQUEST_METHOD'];

// Validate CSRF token for state-changing requests
if ($method === 'POST' || $method === 'DELETE') {
    $inputData = json_decode(file_get_contents("php://input"), true);
    $providedToken = $_SERVER['HTTP_X_CSRF_TOKEN'] ?? $inputData['csrf_token'] ?? '';
    
    if (!$providedToken || $providedToken !== $_SESSION['csrf_token']) {
        http_response_code(403);
        echo json_encode(['error' => 'Invalid CSRF token']);
        exit;
    }
}

try {
    if ($method === 'POST') {
        // Create or Update
        $data = json_decode(file_get_contents("php://input"), true);
        $id = $data['id'] ?? uniqid('post-');
        $title = $data['title'] ?? '';
        $category = $data['category'] ?? '';
        $readTime = $data['readTime'] ?? 0;
        $image = $data['image'] ?? '';
        $excerpt = $data['excerpt'] ?? '';
        $content = $data['content'] ?? '';

        // Check if exists
        $stmt = $pdo->prepare('SELECT id FROM blogs WHERE id = ?');
        $stmt->execute([$id]);
        if ($stmt->fetch()) {
            // Update
            $update = $pdo->prepare('UPDATE blogs SET title=?, category=?, read_time=?, image=?, excerpt=?, content=? WHERE id=?');
            $update->execute([$title, $category, $readTime, $image, $excerpt, $content, $id]);
        } else {
            // Insert
            $insert = $pdo->prepare('INSERT INTO blogs (id, title, category, read_time, image, excerpt, content) VALUES (?, ?, ?, ?, ?, ?, ?)');
            $insert->execute([$id, $title, $category, $readTime, $image, $excerpt, $content]);
        }
        echo json_encode(['success' => true, 'id' => $id]);

    } elseif ($method === 'DELETE') {
        // Delete
        $data = json_decode(file_get_contents("php://input"), true);
        $id = $data['id'] ?? '';
        if ($id) {
            $stmt = $pdo->prepare('DELETE FROM blogs WHERE id = ?');
            $stmt->execute([$id]);
            echo json_encode(['success' => true]);
        } else {
            http_response_code(400);
            echo json_encode(['error' => 'Missing ID']);
        }
    } else {
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database operation failed']);
}
?>
