// ============================================
// SISTEMA DE USUÁRIO - LUNARY
// ============================================


// ============================================
// CADASTRO
// ============================================

async function cadastrarUsuario(event) {

    event.preventDefault();

    const nome = document.getElementById("nome");
    const email = document.getElementById("email");
    const senha = document.getElementById("senha");

    if (!nome || !email || !senha) {
        return;
    }

    const nomeValor = nome.value.trim();
    const emailValor = email.value.trim().toLowerCase();
    const senhaValor = senha.value;


    if (!nomeValor || !emailValor || !senhaValor) {

        alert("Preencha todos os campos!");

        return;
    }


    try {

        const resposta = await fetch(
            "../php/cadastrar_usuario.php",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    nome: nomeValor,
                    email: emailValor,
                    senha: senhaValor
                })
            }
        );


        const resultado = await resposta.json();


        if (resultado.sucesso) {

            alert("Cadastro realizado com sucesso!");

            window.location.href = "login.html";

        } else {

            alert(
                resultado.mensagem ||
                "Não foi possível realizar o cadastro."
            );

        }


    } catch (erro) {

        console.error("Erro no cadastro:", erro);

        alert(
            "Erro ao conectar com o servidor.\n\n" +
            "Verifique se o Apache e o MySQL estão ligados no XAMPP."
        );

    }

}


// ============================================
// LOGIN
// ============================================

async function fazerLogin(event) {

    event.preventDefault();


    const email = document.getElementById("email");
    const senha = document.getElementById("senha");


    if (!email || !senha) {
        return;
    }


    const emailValor =
        email.value.trim().toLowerCase();

    const senhaValor =
        senha.value;


    if (!emailValor || !senhaValor) {

        alert("Preencha e-mail e senha.");

        return;
    }


    try {

        const resposta = await fetch(
            "../php/login_usuario.php",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    email: emailValor,
                    senha: senhaValor
                })
            }
        );


        const resultado = await resposta.json();


        if (resultado.sucesso) {

            // Guarda somente os dados necessários
            // para saber quem está logado
            localStorage.setItem(
                "usuarioLogado",
                JSON.stringify(resultado.usuario)
            );


            alert("Login realizado com sucesso!");


            window.location.href = "index.html";

        } else {

            alert(
                resultado.mensagem ||
                "E-mail ou senha incorretos!"
            );

        }


    } catch (erro) {

        console.error("Erro no login:", erro);

        alert(
            "Erro ao conectar com o servidor.\n\n" +
            "Verifique se o Apache e o MySQL estão ligados no XAMPP."
        );

    }

}


// ============================================
// MOSTRAR USUÁRIO LOGADO
// ============================================

function mostrarUsuario() {

    const elementoNome =
        document.getElementById("nomeUsuario");

    const linkUsuario =
        document.getElementById("linkUsuario");


    const usuarioLogado =
        JSON.parse(
            localStorage.getItem("usuarioLogado")
        );


    if (usuarioLogado) {

        if (elementoNome) {

            elementoNome.textContent =
                usuarioLogado.nome;

        }


        if (linkUsuario) {

            linkUsuario.href = "perfil.html";

        }

    } else {

        if (elementoNome) {

            elementoNome.textContent = "";

        }


        if (linkUsuario) {

            linkUsuario.href = "login.html";

        }

    }

}


// ============================================
// SAIR DA CONTA
// ============================================

function sairDaConta() {

    localStorage.removeItem("usuarioLogado");

    window.location.href = "index.html";

}


// ============================================
// INICIALIZAÇÃO
// ============================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        mostrarUsuario();

    }
);