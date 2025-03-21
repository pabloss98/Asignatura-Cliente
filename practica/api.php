<?php
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Methods: POST, GET, OPTIONS"); 
header("Access-Control-Allow-Headers: Content-Type"); 

$servername = "localhost";
$username = "root"; 
$password = "";     
$dbname = "diabetesdb"; 


$conn = new mysqli($servername, $username, $password, $dbname);


if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    
    $usuario = $data['username'];
    $contra = password_hash($data['password'], PASSWORD_DEFAULT); 
    $nombre = $data['name'];
    $apellidos = $data['surname'];
    $fecha_nacimiento = $data['birthDate'];

    $sql = "INSERT INTO usuario (usuario, contra, nombre, apellidos, fecha_nacimiento) VALUES ('$usuario', '$contra', '$nombre', '$apellidos', '$fecha_nacimiento')";

    if ($conn->query($sql) === TRUE) {
        echo json_encode([
            "id" => $conn->insert_id,
            "usuario" => $usuario,
            "nombre" => $nombre,
            "apellidos" => $apellidos,
            "fecha_nacimiento" => $fecha_nacimiento
        ]);
    } else {
        echo json_encode(["error" => $conn->error]);
    }
}

$conn->close();
?>
