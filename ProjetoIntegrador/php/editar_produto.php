<?php

header("Content-Type: application/json; charset=UTF-8");

require_once "conexao.php";

$dados = json_decode(file_get_contents("php://input"), true);

if (!$dados) {
    echo json_encode([
        "sucesso" => false,
        "mensagem" => "Nenhum dado recebido."
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

$id = intval($dados["id"] ?? 0);
$nome = trim($dados["nome"] ?? "");
$descricao = trim($dados["descricao"] ?? "");
$preco = $dados["preco"] ?? 0;
$imagem = trim($dados["imagem"] ?? "");
$categoria = trim($dados["categoria"] ?? "");
$estoque = $dados["estoque"] ?? 0;

if ($id <= 0) {
    echo json_encode([
        "sucesso" => false,
        "mensagem" => "ID do produto inválido."
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

if ($nome === "" || $preco === "") {
    echo json_encode([
        "sucesso" => false,
        "mensagem" => "Nome e preço são obrigatórios."
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

$sql = "UPDATE produtos
        SET nome = ?,
            descricao = ?,
            preco = ?,
            imagem = ?,
            categoria = ?,
            estoque = ?
        WHERE id = ?";

$stmt = $conexao->prepare($sql);

$stmt->bind_param(
    "ssdssii",
    $nome,
    $descricao,
    $preco,
    $imagem,
    $categoria,
    $estoque,
    $id
);

if ($stmt->execute()) {

    echo json_encode([
        "sucesso" => true,
        "mensagem" => "Produto atualizado com sucesso!"
    ], JSON_UNESCAPED_UNICODE);

} else {

    echo json_encode([
        "sucesso" => false,
        "mensagem" => "Erro ao atualizar produto: " . $stmt->error
    ], JSON_UNESCAPED_UNICODE);
}

$stmt->close();
$conexao->close();

?>