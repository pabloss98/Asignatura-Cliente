<?php

$host = 'localhost';
$db = 'diabetesdb'; 
$user = 'root';
$pass = ''; 

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


$conn = new mysqli($host, $user, $pass, $db);


if ($conn->connect_error) {
    die(json_encode(['success' => false, 'message' => 'Conexión fallida: ' . $conn->connect_error]));
}


if (isset($_GET['id'])) {
    $userId = intval($_GET['id']); 

   
    $sqlDeleteControl = "DELETE FROM control_glucosa WHERE id_usu = ?";
    $stmtControl = $conn->prepare($sqlDeleteControl);
    
    if ($stmtControl === false) {
        die(json_encode(['success' => false, 'message' => 'Error en la consulta para eliminar control_glucosa.']));
    }

    $stmtControl->bind_param("i", $userId);
    $stmtControl->execute();
    $stmtControl->close();

   
    $sql = "DELETE FROM usuario WHERE id_usu = ?";
    $stmt = $conn->prepare($sql);
    
    if ($stmt === false) {
        die(json_encode(['success' => false, 'message' => 'Error en la consulta para eliminar usuario.']));
    }

    $stmt->bind_param("i", $userId);

   
    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Usuario eliminado con éxito.']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error al eliminar el usuario: ' . $stmt->error]);
    }

   
    $stmt->close();
} else {
    echo json_encode(['success' => false, 'message' => 'ID de usuario no proporcionado.']);
}


$conn->close();
?>
