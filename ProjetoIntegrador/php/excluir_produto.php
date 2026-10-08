<?php

header("Content-Type: application/json; charset=UTF-8");

require_once "conexao.php";

$dados = json_decode(file_get_contents("php://input"), true);

$id = intval($dados["id"] ?? 0);

if ($id <= 0) {
    echo json_encode([
        "sucesso" => false,
        "mensagem" => "ID do produto inválido."
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

$sql = "DELETE FROM produtos WHERE id = ?";

$stmt = $conexao->prepare($sql);

$stmt->bind_param("i", $id);

if ($stmt->execute()) {

    echo json_encode([
        "sucesso" => true,
        "mensagem" => "Produto excluído com sucesso!"
    ], JSON_UNESCAPED_UNICODE);

} else {

    echo json_encode([
        "sucesso" => false,
        "mensagem" => "Erro ao excluir produto: " . $stmt->error
    ], JSON_UNESCAPED_UNICODE);
}

$stmt->close();
$conexao->close();

?>