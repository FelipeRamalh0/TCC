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

formCadastro.addEventListener('submit', (event) => {

    event.preventDefault();

    const nome =
        document.getElementById('nomeCadastro').value;

    const email =
        document.getElementById('emailCadastro').value;

    const senha =
        document.getElementById('senhaCadastro').value;

    const confirmarSenha =
        document.getElementById('cadastroConfirmarSenha').value;

    const tipo =
        document.getElementById('nivelCadastro').value;

    if (senha !== confirmarSenha) {
        alert("As senhas não coincidem");
        return;
    }

    let usuarios =
        JSON.parse(localStorage.getItem("usuarios")) || [];

    const usuarioExiste =
        usuarios.find(usuario => usuario.email === email);

    if (usuarioExiste) {
        alert("Esse email já está cadastrado!");
        return;
    }

    const novoUsuario = {
        nome,
        email,
        senha,
        tipo,
        tecnologias: "HTML • CSS • JavaScript",
        foto: "https://i.pravatar.cc/150"
    };

    usuarios.push(novoUsuario);

    localStorage.setItem(
        "usuarios",
        JSON.stringify(usuarios)
    );

    alert("Cadastro realizado com sucesso!");

    formCadastro.reset();

    container.classList.remove('active');
});

/* LOGIN */

formLogin.addEventListener('submit', (event) => {

    event.preventDefault();

    const email =
        document.getElementById('loginEmail').value;

    const senha =
        document.getElementById('loginSenha').value;

    let usuarios =
        JSON.parse(localStorage.getItem("usuarios")) || [];

    const usuario =
        usuarios.find(user =>
            user.email === email &&
            user.senha === senha
        );

    if (!usuario) {
        alert("Email ou senha incorretos!");
        return;
    }

    localStorage.setItem(
        "usuarioLogado",
        JSON.stringify(usuario)
    );

    alert("Login realizado com sucesso!");

    /* REDIRECIONAR CORRIGIDO */

    if (usuario.tipo?.toLowerCase().trim() === "profissional") {

        window.location.href =
            "profissional.html";

    } else {

        window.location.href =
            "aprendiz.html";
    }
});