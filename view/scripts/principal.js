/* FOTO PERFIL */

const fotoInput = document.getElementById("fotoInput");
const preview = document.getElementById("preview");

fotoInput.addEventListener("change", function () {

    const arquivo = this.files[0];

    if (arquivo) {

        const leitor = new FileReader();

        leitor.onload = function (e) {
            preview.src = e.target.result;
        }

        leitor.readAsDataURL(arquivo);
    }

});


/* ATIVIDADES */

const atividadeBox = document.getElementById("atividadeBox");
const tituloAtividade = document.getElementById("tituloAtividade");
const descricaoAtividade = document.getElementById("descricaoAtividade");

const barra = document.querySelector(".progresso");
const textoProgresso = document.getElementById("textoProgresso");

let progressoAtual = 0;

function abrirAtividade(titulo, descricao) {

    atividadeBox.style.display = "block";

    tituloAtividade.innerText = titulo;
    descricaoAtividade.innerText = descricao;
}

function concluirAtividade() {

    if (progressoAtual < 100) {

        progressoAtual += 10;

        if (progressoAtual > 100) {
            progressoAtual = 100;
        }

        barra.style.width = progressoAtual + "%";

        textoProgresso.innerText =
            progressoAtual + "% concluído";

        alert("Atividade concluída com sucesso!");
    }
}


/* =========================
   TIPO DE USUÁRIO
========================= */

// TESTE:
// troque entre:
// "Aprendiz"
// "Profissional"

localStorage.setItem("tipoUsuario", "Aprendiz");

// localStorage.setItem("tipoUsuario", "Profissional");

const tipoUsuario = localStorage.getItem("tipoUsuario");

const areaProfessor = document.getElementById("areaProfessor");
const painelProfessor = document.getElementById("painelProfessor");


// SE FOR APRENDIZ
if (tipoUsuario === "Aprendiz") {

    areaProfessor.style.display = "none";
    painelProfessor.style.display = "none";

}


// SE FOR PROFISSIONAL
if (tipoUsuario === "Profissional") {

    areaProfessor.style.display = "flex";
    painelProfessor.style.display = "block";

}


/* CRIAR DESAFIOS */

const listaDesafios = document.getElementById("listaDesafios");

function criarDesafio() {

    const titulo = document.getElementById("tituloDesafio").value;

    const descricao = document.getElementById("descricaoDesafio").value;

    if (titulo === "" || descricao === "") {

        alert("Preencha todos os campos!");
        return;
    }

    const novoCard = document.createElement("div");

    novoCard.classList.add("step");

    novoCard.innerHTML = `

        <span>🆕</span>

        <p>${titulo}</p>

    `;

    novoCard.onclick = function () {

        abrirAtividade(titulo, descricao);
    }

    listaDesafios.appendChild(novoCard);

    document.getElementById("tituloDesafio").value = "";
    document.getElementById("descricaoDesafio").value = "";

    alert("Desafio publicado com sucesso!");
}


/* ABRIR PAINEL PROFESSOR */

function abrirPainelProfessor() {

    painelProfessor.style.display = "block";

    painelProfessor.scrollIntoView({
        behavior: "smooth"
    });
}