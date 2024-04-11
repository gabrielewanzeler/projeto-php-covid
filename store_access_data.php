
<?php

$hostname = "localhost";
$usuario = "root";
$senha = "Gabriele123#";
$bancodedados = "covid";

$mysqli = new mysqli($hostname, $usuario, $senha, $bancodedados);

if ($mysqli->connect_error) {
    die("Conexão falhou: " . $mysqli->connect_error);
}


if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $data = json_decode(file_get_contents('php://input'), true);

    // Insira os dados no banco de dados usando prepared statements
    $stmt = $mysqli->prepare("INSERT INTO access_logs (country, access_time) VALUES (?, ?)");
    $stmt->bind_param("ss", $country, $accessTime);

    $country = $mysqli->real_escape_string($data['country']);
    $accessTime = date('Y-m-d H:i:s', strtotime($data['accessTime']));

    if ($stmt->execute()) {
        echo "Dados de acesso armazenados com sucesso.";
    } else {
        echo "Erro ao armazenar os dados de acesso: " . $mysqli->error;
    }

    $stmt->close();
}


if ($_SERVER["REQUEST_METHOD"] == "GET") {

    $sql = "SELECT country, access_time FROM access_logs ORDER BY access_time DESC LIMIT 1";
    $resultado = $mysqli->query($sql);

    if ($resultado->num_rows > 0) {
        // Converter o resultado em um array associativo
        $row = $resultado->fetch_assoc();
        // Retornar os dados como JSON
        echo json_encode($row);
    } else {

        echo json_encode(null);
    }
}

// Fechar a conexão com o banco de dados
$mysqli->close();

?>
