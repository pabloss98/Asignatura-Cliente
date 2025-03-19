<?php
$host = "localhost"; // Cambiar si usas un servidor diferente
$user = "root";      // Usuario de MySQL
$pass = "";          // Contraseña de MySQL (dejar vacío si no tiene)
$dbname = "diabetesdb"; // Nombre de la base de datos

$conn = new mysqli($host, $user, $pass, $dbname);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}
?>
