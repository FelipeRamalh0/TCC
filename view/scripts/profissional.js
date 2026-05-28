const listaAtividades =
  document.getElementById("listaAtividades");

function trocarPagina(idPagina) {

  const paginas =
    document.querySelectorAll(".pagina");

  paginas.forEach((pagina) => {
    pagina.classList.remove("ativa");
  });

  document
    .getElementById(idPagina)
    .classList.add("ativa");
}

function criarAtividade() {

  const titulo =
    document.getElementById("titulo").value;

  const descricao =
    document.getElementById("descricao").value;

  if (titulo === "" || descricao === "") {

    alert("Preencha todos os campos!");

    return;
  }

  const novaAtividade =
    document.createElement("div");

  novaAtividade.classList.add("atividade");

  novaAtividade.innerHTML = `
  
    <h3>${titulo}</h3>

    <p>${descricao}</p>

    <div class="botoes-atividade">

      <button onclick="marcarConcluida(this)">
        Concluir
      </button>

      <button
        class="btn-excluir"
        onclick="excluirAtividade(this)"
      >
        Excluir
      </button>

    </div>

  `;

  listaAtividades.appendChild(novaAtividade);

  document.getElementById("titulo").value = "";

  document.getElementById("descricao").value = "";
}

function marcarConcluida(botao) {

  const atividade =
    botao.closest(".atividade");

  atividade.classList.add("concluida");

  botao.innerText = "Concluída";

  botao.disabled = true;
}

function excluirAtividade(botao) {

  const confirmar =
    confirm("Deseja excluir esta atividade?");

  if (!confirmar) {
    return;
  }

  const atividade =
    botao.closest(".atividade");

  atividade.remove();
}

function aprovarAtividade(botao) {

  const entrega =
    botao.closest(".entrega");

  const status =
    entrega.querySelector(".status");

  status.innerText = "Aprovado";

  status.classList.remove("pendente");

  status.classList.add("aprovado");
}

function enviarFeedback(botao) {

  const entrega =
    botao.closest(".entrega");

  const textarea =
    entrega.querySelector(".feedback-input");

  const feedbackArea =
    entrega.querySelector(".feedback-area");

  if (textarea.value === "") {

    alert("Digite um feedback!");

    return;
  }

  const feedback =
    document.createElement("div");

  feedback.classList.add("feedback-card");

  feedback.innerHTML = `
  
    <strong>Feedback enviado:</strong>

    <p>${textarea.value}</p>

  `;

  feedbackArea.appendChild(feedback);

  textarea.value = "";
}