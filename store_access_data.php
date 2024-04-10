
<?php

$hostname = "localhost";
$usuario = "root";
$senha = "Gabriele123#";
$bancodedados = "covid";

$mysqli = new mysqli($hostname, $usuario, $senha, $bancodedados);


if ($mysqli->connect_error) {
    die("Conexão falhou: " . $mysqli->connect_error);
}

// os dados da requisição POST
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

// Fecha a conexão com o banco de dados
$stmt->close();
$mysqli->close();
?>
