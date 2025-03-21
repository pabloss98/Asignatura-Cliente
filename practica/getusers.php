<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


$host = 'localhost';
$db = 'diabetesdb'; 
$user = 'root';
$pass = '';

$conn = new mysqli($host, $user, $pass, $db);


if ($conn->connect_error) {
    die(json_encode(['success' => false, 'message' => 'Conexión fallida: ' . $conn->connect_error]));
}


$sql = "SELECT id_usu, usuario, nombre, apellidos, fecha_nacimiento FROM usuario"; 
$result = $conn->query($sql);

$users = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $users[] = $row;
    }
}

$conn->close();
echo json_encode($users); 
?>
