// ============================================
// PRODUTOS - LUNARY
// ============================================

const produtos = [
    {
        nome: "Cesta Boho",
        descricao: "Cesta artesanal inspirada no estilo boho.",
        preco: 79.90,
        imagem: "../img/cesta.jpg"
    },

    {
        nome: "Kit Cozy",
        descricao: "Kit artesanal com estilo cozy e aconchegante.",
        preco: 69.90,
        imagem: "../img/kitcozy.jpg"
    },

    {
        nome: "Vela Aromática",
        descricao: "Vela artesanal aromática para deixar o ambiente mais aconchegante.",
        preco: 76.90,
        imagem: "../img/velaaromatica.jpg"
    }
];


// ============================================
// CARREGAR PRODUTOS
// ============================================

function carregarProdutos() {

    const container = document.getElementById("listaProdutos");

    if (!container) return;

    container.innerHTML = "";

    produtos.forEach(function(produto) {

        const card = document.createElement("div");

        card.className = "produto-card";

        card.innerHTML = `

            <img
                src="${produto.imagem}"
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
                ${produto.descricao}
            </p>

            <span>
                R$ ${produto.preco
                    .toFixed(2)
                    .replace(".", ",")}
            </span>

            <button
                onclick="adicionarCarrinho(
                    '${produto.nome.replace(/'/g, "\\'")}',
                    ${produto.preco},
                    '${produto.imagem}'
                )"
            >
                Adicionar ao Carrinho
            </button>

        `;

        container.appendChild(card);

    });
}


// ============================================
// INICIAR
// ============================================

document.addEventListener(
    "DOMContentLoaded",
    carregarProdutos
);
