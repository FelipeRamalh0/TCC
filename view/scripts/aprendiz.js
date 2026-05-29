const listaDesafios = document.getElementById("listaDesafios");
const atividadeBox = document.getElementById("atividadeBox");
const tituloAtividade = document.getElementById("tituloAtividade");
const descricaoAtividade = document.getElementById("descricaoAtividade");
const arquivoProjeto = document.getElementById("arquivoProjeto");
const nomeArquivo = document.getElementById("nomeArquivo");

window.addEventListener("load", () => {
  carregarAtividades();
});

/* MOSTRAR ATIVIDADES */
function carregarAtividades() {
  listaDesafios.innerHTML = "";

  let atividades =
    JSON.parse(localStorage.getItem("atividades")) || [];

  atividades.forEach((atividade) => {
    listaDesafios.innerHTML += `
      <div class="atividade-card">

        <div class="topo-atividade">
          <h3>${atividade.titulo}</h3>
          <span class="status pendente">${atividade.status}</span>
        </div>

        <p>${atividade.descricao}</p>

        <div class="acoes-atividade">
          <button onclick="abrirAtividade('${atividade.titulo}','${atividade.descricao}')">
            Ver atividade
          </button>
        </div>

      </div>
    `;
  });
}

/* ABRIR */
function abrirAtividade(titulo, descricao) {
  atividadeBox.style.display = "block";
  tituloAtividade.innerText = titulo;
  descricaoAtividade.innerText = descricao;
}

/* ENVIAR */
function enviarProjeto() {
  const resposta = document.getElementById("respostaAluno").value;

  if (resposta === "") {
    mostrarNotificacao("❌ Digite sua resposta!");
    return;
  }

  const arquivo = arquivoProjeto.files[0];

  const entrega = {
    titulo: tituloAtividade.innerText,
    resposta,
    arquivo: arquivo ? arquivo.name : "Nenhum arquivo enviado",
    status: "Pendente",
    feedback: ""
  };

  let entregas =
    JSON.parse(localStorage.getItem("entregas")) || [];

  entregas.push(entrega);

  localStorage.setItem("entregas", JSON.stringify(entregas));

  mostrarNotificacao("🚀 Projeto enviado!");

  document.getElementById("respostaAluno").value = "";
  arquivoProjeto.value = "";
  nomeArquivo.innerText = "";
  atividadeBox.style.display = "none";
}

/* FOTO PERFIL */
const fotoInput = document.getElementById("fotoInput");
const preview = document.getElementById("preview");

if (fotoInput) {
  fotoInput.addEventListener("change", function () {
    const arquivo = this.files[0];

    if (arquivo) {
      const leitor = new FileReader();

      leitor.onload = function (e) {
        preview.src = e.target.result;
      };

      leitor.readAsDataURL(arquivo);
    }
  });
}

/* ARQUIVO */
if (arquivoProjeto) {
  arquivoProjeto.addEventListener("change", function () {
    if (this.files.length > 0) {
      nomeArquivo.innerText =
        "📁 Arquivo selecionado: " + this.files[0].name;
    }
  });
}

/* NOTIFICAÇÃO */
function mostrarNotificacao(mensagem) {
  const notificacao = document.getElementById("notificacao");

  notificacao.innerText = mensagem;
  notificacao.classList.add("mostrar");

  setTimeout(() => {
    notificacao.classList.remove("mostrar");
  }, 3000);
}