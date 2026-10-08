// ============================================
// PRODUTOS DO BANCO - PÁGINA DE PRODUTOS
// ============================================

async function carregarProdutosDoBanco() {

    const container = document.getElementById("listaProdutos");

    if (!container) return;

    try {

        const resposta = await fetch("../php/listar_produtos.php");

        const resultado = await resposta.json();

        if (!resultado.sucesso) {

            console.log("Não foi possível carregar produtos do banco.");

            return;
        }

        const produtosBanco = resultado.produtos || [];

        // Se não tiver produtos cadastrados pelo Admin,
        // mantém os produtos que já estavam na página.
        if (produtosBanco.length === 0) {
            return;
        }


        produtosBanco.forEach(function(produto) {

            const imagem = produto.imagem
                ? produto.imagem
                : "../img/logo.png";


            const card = document.createElement("div");

            card.className = "produto-card";

            card.setAttribute(
                "data-produto-banco",
                produto.id
            );


            card.innerHTML = `

                <img
                    src="${imagem}"
                    alt="${produto.nome}"
                    onerror="this.src='../img/logo.png'"
                >

                <h3>
                    ${produto.nome}
                </h3>

                <div class="avaliacao">

                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-regular fa-star"></i>

                    <span>
                        Confira as avaliações
                    </span>

                </div>

                <p>
                    ${produto.descricao || "Produto artesanal da Lunary."}
                </p>

                <span>
                    R$ ${Number(produto.preco)
                        .toFixed(2)
                        .replace(".", ",")}
                </span>

                <button
                    onclick="adicionarCarrinho(
                        '${produto.nome.replace(/'/g, "\\'")}',
                        ${Number(produto.preco)},
                        '${imagem}'
                    )">

                    Adicionar ao Carrinho

                </button>

            `;


            container.appendChild(card);

        });


    } catch (erro) {

        console.error(
            "Erro ao carregar produtos do banco:",
            erro
        );

    }

}


// ============================================
// INICIAR
// ============================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        carregarProdutosDoBanco();

    }
);