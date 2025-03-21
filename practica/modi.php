<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$host = 'localhost';
$db = 'diabetesdb'; 
$user = 'root';
$pass = '';

$conn = new mysqli($host, $user, $pass, $db);


if ($conn->connect_error) {
    die(json_encode(["error" => "Conexión fallida: " . $conn->connect_error]));
}

if ($_SERVER["REQUEST_METHOD"] == "PUT") {
    
    $data = json_decode(file_get_contents("php://input"), true);
    
    $usuario = $data["usuario"] ?? null;
    $nombre = $data["nombre"] ?? null;
    $apellido = $data["apellido"] ?? null;
    $fecha_nacimiento = $data["fecha_nacimiento"] ?? null;
    $clave = isset($data["clave"]) && !empty($data["clave"]) ? password_hash($data["clave"], PASSWORD_BCRYPT) : null;

    if (!$usuario || !$nombre || !$apellido || !$fecha_nacimiento) {
        echo json_encode(["error" => "Faltan datos obligatorios"]);
        exit;
    }

   
    $sql = "UPDATE usuario SET nombre = ?, apellido = ?, fecha_nacimiento = ?";
    $params = [$nombre, $apellido, $fecha_nacimiento];
    $types = "sss";

    if ($clave) {
        $sql .= ", clave = ?";
        $params[] = $clave;
        $types .= "s";
    }

    $sql .= " WHERE usuario = ?";
    $params[] = $usuario;
    $types .= "s";

    
    $stmt = $conn->prepare($sql);
    if (!$stmt) {
        echo json_encode(["error" => "Error en la preparación de la consulta: " . $conn->error]);
        exit;
    }

    $stmt->bind_param($types, ...$params);

    
    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Usuario actualizado correctamente"]);
    } else {
        echo json_encode(["error" => "Error al actualizar el usuario: " . $stmt->error]);
    }

    $stmt->close();
    $conn->close();
}

?>
