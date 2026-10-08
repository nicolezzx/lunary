<?php

header("Content-Type: application/json; charset=UTF-8");

require_once "conexao.php";

$sql = "
    SELECT
        pedidos.id AS id_pedido,
        pedidos.total,
        pedidos.data_pedido,

        usuarios.id AS id_usuario,
        usuarios.nome AS nome_usuario,
        usuarios.email AS email_usuario,

        itens_pedido.id_produto,
        itens_pedido.quantidade,
        itens_pedido.preco,

        produtos.nome AS nome_produto,
        produtos.imagem AS imagem_produto

    FROM pedidos

    LEFT JOIN usuarios
        ON pedidos.id_usuario = usuarios.id

    LEFT JOIN itens_pedido
        ON pedidos.id = itens_pedido.id_pedido

    LEFT JOIN produtos
        ON itens_pedido.id_produto = produtos.id

    ORDER BY pedidos.data_pedido DESC
";

$resultado = $conexao->query($sql);

$pedidos = [];

if ($resultado) {

    while ($linha = $resultado->fetch_assoc()) {

        $idPedido = $linha["id_pedido"];

        if (!isset($pedidos[$idPedido])) {

            $pedidos[$idPedido] = [
                "id" => $idPedido,
                "total" => $linha["total"],
                "data_pedido" => $linha["data_pedido"],
                "id_usuario" => $linha["id_usuario"],
                "nome_usuario" => $linha["nome_usuario"] ?: "Cliente",
                "email_usuario" => $linha["email_usuario"] ?: "",
                "itens" => []
            ];

        }

        if ($linha["id_produto"]) {

            $pedidos[$idPedido]["itens"][] = [
                "id_produto" => $linha["id_produto"],
                "nome" => $linha["nome_produto"] ?: "Produto",
                "quantidade" => $linha["quantidade"],
                "preco" => $linha["preco"],
                "imagem" => $linha["imagem_produto"]
            ];

        }

    }

    $pedidos = array_values($pedidos);

    echo json_encode([
        "sucesso" => true,
        "pedidos" => $pedidos
    ], JSON_UNESCAPED_UNICODE);

} else {

    echo json_encode([
        "sucesso" => false,
        "mensagem" => "Erro ao buscar pedidos."
    ], JSON_UNESCAPED_UNICODE);

}

$conexao->close();

?>