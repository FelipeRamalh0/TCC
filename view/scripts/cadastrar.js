const container = document.getElementById('container');

const registerBtn = document.getElementById('register');

const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add('active');
});

loginBtn.addEventListener('click', () => {
    container.classList.remove('active');
});


// ============================
// FORMULÁRIOS
// ============================

const formCadastro = document.querySelector('.sign-up form');

const formLogin = document.querySelector('.sign-in form');


// ============================
// CADASTRO
// ============================

formCadastro.addEventListener('submit', async (event) => {

    event.preventDefault();

    const nome = document.getElementById('nomeCadastro').value;

    const email = document.getElementById('emailCadastro').value;

    const senha = document.getElementById('senhaCadastro').value;

    const confirmarSenha = document.getElementById('cadastroConfirmarSenha').value;

    const tipoSelecionado = document.getElementById('nivelCadastro').value;

    // Converter para o ENUM do banco
    const tipo_usuario =
        tipoSelecionado === "aprendiz"
            ? "Aprendiz"
            : "Profissional";


    // VALIDAR SENHAS
    if (senha !== confirmarSenha) {

        alert("As senhas não coincidem");

        return;
    }

    try {

        const resposta = await fetch('http://localhost:3000/cadastrar', {

            method: 'POST',

            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                nome,
                email,
                senha,
                tipo_usuario
            })

        });

        const dados = await resposta.json();

        console.log(dados);

        if (resposta.ok) {

            alert("Cadastro realizado com sucesso!");

            // Volta para tela de login
            container.classList.remove('active');

            formCadastro.reset();

        } else {

            alert(dados.erro || dados.mensagem);

        }

    } catch (erro) {

        console.log(erro);

        alert("Erro ao conectar com o servidor");

    }

});


// ============================
// LOGIN
// ============================

formLogin.addEventListener('submit', async (event) => {

    event.preventDefault();

    const email = document.getElementById('loginEmail').value;

    const senha = document.getElementById('loginSenha').value;

    try {

        const resposta = await fetch('http://localhost:3000/login', {

            method: 'POST',

            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                email,
                senha
            })

        });

        const dados = await resposta.json();

        console.log(dados);

        if (resposta.ok) {

            // Salvar token
            localStorage.setItem("token", dados.token);

            // Salvar usuário
            localStorage.setItem("usuario", JSON.stringify(dados.usuario));

            alert("Login realizado com sucesso!");

            // Redirecionar
            window.location.href = "../pages/principal.html";

        } else {

            alert(dados.erro || dados.mensagem);

        }

    } catch (erro) {

        console.log(erro);

        alert("Erro ao conectar com o servidor");

    }

});