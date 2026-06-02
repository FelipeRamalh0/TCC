window.onload = () => {
  carregarAtividades();
  carregarEntregas();
  carregarAprendizes();
  atualizarAprendizesAtivos();
};

/* =========================
   TROCA DE PÁGINA
========================= */
function trocarPagina(pagina) {

  document.querySelectorAll(".pagina").forEach(secao => {
    secao.classList.remove("ativa");
  });

  const elemento = document.getElementById(pagina);

  if (elemento) {
    elemento.classList.add("ativa");
  }
}

/* =========================
   CRIAR ATIVIDADE
========================= */
function criarAtividade() {

  const titulo = document.getElementById("titulo").value;
  const descricao = document.getElementById("descricao").value;
  const nivel= document.getElementedById("nivel").value;
  const categoria= document.getElementedById("categoria").value;
  if (!titulo || !descricao || !nivel || !categoria) {
    alert("Preencha todos os campos!");
    return;
  }

  let atividades = JSON.parse(localStorage.getItem("atividades")) || [];

  atividades.push({
    titulo,
    descricao,
    nivel, 
    categoria,
    status: "Pendente"
  });

  localStorage.setItem("atividades", JSON.stringify(atividades));

  alert("Atividade criada!");

  document.getElementById("titulo").value = "";
  document.getElementById("descricao").value = "";
  document.getElementById("nivel").value = "";
  document.getElementById("categoria").value = "";

  carregarAtividades();
}

/* =========================
   LISTAR ATIVIDADES
========================= */
function carregarAtividades() {

  const lista = document.getElementById("listaAtividades");
  lista.innerHTML = "";

  let atividades = JSON.parse(localStorage.getItem("atividades")) || [];

  atividades.forEach((a, index) => {

    lista.innerHTML += `
      <div class="atividade">
        <h3>${a.titulo}</h3>
        <p>${a.descricao}</p>
        <p>${a.nivel}</p>
        <p>${a.categoria}</p>

        <div class="botoes-atividade">
          <button class="btn-entregas">Ver entregas</button>
          <button class="btn-excluir" onclick="excluirAtividade(${index})">Excluir</button>
        </div>
      </div>
    `;
  });
}

/* =========================
   EXCLUIR ATIVIDADE
========================= */
function excluirAtividade(index) {

  let atividades = JSON.parse(localStorage.getItem("atividades")) || [];

  atividades.splice(index, 1);

  localStorage.setItem("atividades", JSON.stringify(atividades));

  carregarAtividades();
}

/* =========================
   ENTREGAS
========================= */
function carregarEntregas() {

  const area = document.getElementById("desempenho");
  area.innerHTML = "";

  let entregas = JSON.parse(localStorage.getItem("entregas")) || [];

  entregas.forEach((e, index) => {

    area.innerHTML += `
      <div class="atividade entrega">

        <div class="topo-entrega">
          <h3>${e.titulo}</h3>

          <span class="status ${e.status === "Aprovado" ? "aprovado" : "pendente"}">
            ${e.status}
          </span>
        </div>

        <div class="codigo-box">
          <p>${e.resposta || ""}</p>
          <strong>Arquivo:</strong>
          <p>${e.arquivo || ""}</p>
        </div>

        <textarea id="feedback-${index}" class="feedback-input"></textarea>

        <div class="acoes">
          <button onclick="aprovarAtividade(${index})">Aprovar</button>
          <button class="btn-feedback" onclick="enviarFeedback(${index})">Feedback</button>
        </div>

      </div>
    `;
  });
}

/* =========================
   APROVAR ENTREGA
========================= */
function aprovarAtividade(index) {

  let entregas = JSON.parse(localStorage.getItem("entregas")) || [];

  if (entregas[index]) {
    entregas[index].status = "Aprovado";
  }

  localStorage.setItem("entregas", JSON.stringify(entregas));

  location.reload();
}

/* =========================
   FEEDBACK
========================= */
function enviarFeedback(index) {

  let entregas = JSON.parse(localStorage.getItem("entregas")) || [];

  const feedback = document.getElementById(`feedback-${index}`).value;

  if (entregas[index]) {
    entregas[index].feedback = feedback;
  }

  localStorage.setItem("entregas", JSON.stringify(entregas));

  alert("Feedback enviado!");
}

/* =========================
   APRENDIZES
========================= */
function carregarAprendizes() {

  const lista = document.getElementById("listaAprendizes");

  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  lista.innerHTML = "";

  usuarios.forEach(u => {

    if (u.tipo === "aprendiz") {

      lista.innerHTML += `
        <div class="atividade">
          <h3>${u.nome}</h3>
          <p>${u.email}</p>
        </div>
      `;
    }
  });
}

/* =========================
   APRENDIZES ATIVOS
========================= */
function atualizarAprendizesAtivos() {

  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  const total = usuarios.filter(u => u.tipo === "aprendiz").length;

  const el = document.getElementById("totalAprendizes");

  if (el) {
    el.innerText = total;
  }
}