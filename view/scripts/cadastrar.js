const container = document.getElementById('container');

const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

/* EVITA ERRO SE NÃO EXISTIR */
if (registerBtn && loginBtn && container) {

    registerBtn.addEventListener('click', () => {
        container.classList.add('active');
    });

    loginBtn.addEventListener('click', () => {
        container.classList.remove('active');
    });

}

/* FORMULÁRIOS */

const formCadastro =
    document.querySelector('.sign-up form');

const formLogin =
    document.querySelector('.sign-in form');

/* CADASTRO */

formCadastro.addEventListener("submit", async (event) => {

    event.preventDefault();

    const nome =
        document.getElementById("nomeCadastro").value;

    const email =
        document.getElementById("emailCadastro").value;

    const senha =
        document.getElementById("senhaCadastro").value;

    const confirmarSenha =
        document.getElementById("cadastroConfirmarSenha").value;

    const tipo_usuario =
        document.getElementById("nivelCadastro").value;

    if (senha !== confirmarSenha) {

        alert("As senhas não coincidem");
        return;

    }

    try {
       
        const resposta = await fetch(
            "http://localhost:3000/cadastrar",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    nome,
                    email,
                    senha,
                    tipo_usuario
                })
            }
        );

        const dados = await resposta.json();

        if (!resposta.ok) {

            alert(dados.erro);
            return;

        }

        alert("Cadastro realizado com sucesso!");

        formCadastro.reset();

        container.classList.remove("active");

    } catch (erro) {

        console.error(erro);

        alert(
            "Erro ao conectar com o servidor"
        );

    }

});
/* LOGIN */

formLogin.addEventListener("submit", async (event) => {

    event.preventDefault();

    const email =
        document.getElementById("loginEmail").value;

    const senha =
        document.getElementById("loginSenha").value;

    try {

        const resposta = await fetch(
            "http://localhost:3000/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    senha
                })
            }
        );

        const dados = await resposta.json();

        if (!resposta.ok) {

            alert(dados.erro);
            return;

        }

        localStorage.setItem(
            "token",
            dados.token
        );

        localStorage.setItem(
            "usuario",
            JSON.stringify(dados.usuario)
        );

        alert("Login realizado com sucesso!");

        if (
            dados.usuario.tipo_usuario ===
            "Profissional"
        ) {

            window.location.href =
                "profissional.html";

        } else {

            window.location.href =
                "aprendiz.html";

        }

    } catch (erro) {

        console.error(erro);

        alert(
            "Erro ao conectar com o servidor"
        );

    }

});