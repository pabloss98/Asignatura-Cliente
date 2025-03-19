<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: DELETE');
header('Access-Control-Allow-Headers: Content-Type');

require_once '../config/database.php';

$data = json_decode(file_get_contents('php://input'));

try {
    $query = "DELETE FROM usuario WHERE usuario = ?";
    $stmt = $pdo->prepare($query);
    $stmt->execute([$data->usuario]);
    
    echo json_encode(['message' => 'Usuario eliminado exitosamente']);
} catch(PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
?>
