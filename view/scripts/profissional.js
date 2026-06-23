// =========================
// INICIALIZAÇÃO
// =========================

window.onload = async () => {
  await carregarAtividades();
  await carregarEntregas();
};


// =========================
// TROCA DE PÁGINA
// =========================

function trocarPagina(pagina) {
  document.querySelectorAll(".pagina").forEach(secao => {
    secao.classList.remove("ativa");
  });

  const elemento = document.getElementById(pagina);

  if (elemento) {
    elemento.classList.add("ativa");
  }
}


// =========================
// CRIAR ATIVIDADE
// =========================

document.getElementById("formTarefa").addEventListener("submit", async function (e) {
  e.preventDefault();

  const token = localStorage.getItem("token");

  const titulo = document.getElementById("titulo").value;
  const descricao = document.getElementById("descricao").value;
  const nivel = document.getElementById("nivel").value;
  const categoria = document.getElementById("categoria").value;

  if (!titulo || !descricao || !nivel || !categoria) {
    alert("Preencha todos os campos!");
    return;
  }

  try {
    const resposta = await fetch("http://localhost:3000/tarefas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        titulo,
        descricao,
        nivel_dificuldade: nivel,
        categoria,
        status: "aberta"
      })
    });

    const dados = await resposta.json();

    if (!resposta.ok) {
      alert(dados.erro || "Erro ao criar atividade");
      return;
    }

    alert("Atividade criada com sucesso!");

    e.target.reset();

    await carregarAtividades();

  } catch (error) {
    console.error("Erro ao criar atividade:", error);
  }
});


// =========================
// LISTAR ATIVIDADES
// =========================

async function carregarAtividades() {
  const token = localStorage.getItem("token");

  try {
    const resposta = await fetch(
      "http://localhost:3000/tarefas/profissional",
      {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      }
    );

    const atividades = await resposta.json();

    const lista = document.getElementById("listaAtividades");
    lista.innerHTML = "";

    atividades.forEach((a) => {
      lista.innerHTML += `
        <div class="atividade" id="tarefa-${a.id_tarefa}">
          <h3>${a.titulo}</h3>
          <p>${a.descricao}</p>
          <p>${a.nivel_dificuldade}</p>
          <p>${a.categoria}</p>

          <div class="botoes-atividade">
            <button class="btn-entregas" onclick="trocarPagina('desempenho')">
              Ver entregas
            </button>

            <button class="btn-excluir" onclick="excluirAtividade(${a.id_tarefa})">
              Excluir
            </button>
          </div>
        </div>
      `;
    });

  } catch (error) {
    console.error("Erro ao carregar atividades:", error);
  }
}


// =========================
// EXCLUIR ATIVIDADE
// =========================

async function excluirAtividade(id_tarefa) {
  const token = localStorage.getItem("token");

  try {
    const resposta = await fetch(
      `http://localhost:3000/tarefas/${id_tarefa}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    const dados = await resposta.json();

    if (!resposta.ok) {
      alert(dados.erro || "Erro ao excluir tarefa");
      return;
    }

    const card = document.getElementById(`tarefa-${id_tarefa}`);
    if (card) card.remove();

    alert("Tarefa excluída com sucesso!");

    await carregarAtividades();

  } catch (erro) {
    console.error("Erro ao excluir atividade:", erro);
    alert("Erro ao conectar com o servidor");
  }
}


// =========================
// ENTREGAS
// =========================

async function carregarEntregas() {
  const token = localStorage.getItem("token");

  try {
    const resposta = await fetch(
      "http://localhost:3000/entregas-profissional",
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      }
    );

    const entregas = await resposta.json();

    const area = document.getElementById("desempenho");
    area.innerHTML = "";

    entregas.forEach((e, index) => {
      area.innerHTML += `
        <div class="atividade entrega">

          <div class="topo-entrega">
            <h3>${e.titulo}</h3>
            <p>Aprendiz: ${e.aprendiz_nome}</p>

            <span class="status ${e.status === "Aprovado" ? "Aprovado" : "pendente"}"></span>
          </div>

          <div class="codigo-box">
            <p>${e.codigo_texto || ""}</p>

            <strong>Arquivo:</strong>
            <a href="http://localhost:3000/uploads/${e.arquivo_url}" target="_blank">
              Ver arquivo
            </a>
          </div>

          ${
            e.status_entrega === "Aprovado"
              ? `
                <div class="feedback-salvo">
                  <strong>Feedback:</strong>
                  <p>${e.feedback || "Sem feedback"}</p>
                </div>

                <button disabled>Entrega já aprovada</button>
              `
              : `
                <textarea id="feedback-${index}" class="feedback-input" placeholder="Dê o seu feedback"></textarea>

                <button class="aprovar" onclick="aprovarAtividade(${e.id_entrega}, ${index})">
                  Aprovar
                </button>

                <button class="reprovar" onclick="reprovarAtividade(${e.id_entrega}, ${index})">
                  Reprovar
                </button>
              `
          }

        </div>
      `;
    });

  } catch (error) {
    console.error("Erro ao carregar entregas:", error);
  }
}


// =========================
// APROVAR
// =========================

async function aprovarAtividade(id_entrega, index) {
  const token = localStorage.getItem("token");

  const feedback = document.getElementById(`feedback-${index}`).value;

  if (!feedback.trim()) {
    alert("Digite um feedback.");
    return;
  }

  try {
    const resposta = await fetch(
      `http://localhost:3000/entregas/${id_entrega}/status`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          status: "Aprovado",
          feedback
        })
      }
    );

    const dados = await resposta.json();

    if (!resposta.ok) {
      alert(dados.erro || "Erro ao aprovar entrega");
      return;
    }

    alert("Entrega aprovada com sucesso!");
    await carregarEntregas();

  } catch (error) {
    console.error("Erro ao aprovar:", error);
  }
}


// =========================
// REPROVAR
// =========================

async function reprovarAtividade(id_entrega, index) {
  const token = localStorage.getItem("token");

  const feedback = document.getElementById(`feedback-${index}`).value;

  if (!feedback.trim()) {
    alert("Digite um feedback.");
    return;
  }

  try {
    const resposta = await fetch(
      `http://localhost:3000/entregas/${id_entrega}/status`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          status: "Reprovado",
          feedback
        })
      }
    );

    const dados = await resposta.json();

    if (!resposta.ok) {
      alert(dados.erro || "Erro ao reprovar entrega");
      return;
    }

    alert("Entrega reprovada com sucesso!");
    await carregarEntregas();

  } catch (error) {
    console.error("Erro ao reprovar:", error);
  }
}


// =========================
// LOGOUT (MODAL)
// =========================

function abrirModal() {
  document.getElementById("modalSair").style.display = "flex";
}

function fecharModal() {
  document.getElementById("modalSair").style.display = "none";
}

function confirmarSaida() {
  localStorage.removeItem("token");
  localStorage.removeItem("usuario");
  window.location.href = "../index.html";
}


// =========================
// EXCLUIR CONTA (MODAL)
// =========================

function abrirModalExcluir() {
  document.getElementById("modalExcluirConta").style.display = "flex";
}

function fecharModalExcluir() {
  document.getElementById("modalExcluirConta").style.display = "none";
  document.getElementById("confirmarExclusaoInput").value = "";
}

function confirmarExclusaoConta() {
  const valor = document.getElementById("confirmarExclusaoInput").value;

  if (valor !== "EXCLUIR") {
    alert("Digite EXCLUIR corretamente para confirmar.");
    return;
  }

  localStorage.removeItem("token");
  localStorage.removeItem("usuario");

  alert("Conta excluída com sucesso!");
  window.location.href = "../pages/login.html";
}