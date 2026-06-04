// =========================
// TROCAR SEÇÕES
// =========================

function mostrarSecao(secaoId) {

  const secoes =
    document.querySelectorAll(".section");

  secoes.forEach(secao => {
    secao.classList.remove("active");
  });

  document
    .getElementById(secaoId)
    .classList.add("active");

}

// =========================
// VARIÁVEL GLOBAL
// =========================

let tarefaSelecionada = null;

// =========================
// LISTAR TAREFAS
// =========================

async function carregarTarefas() {

  const token =
    localStorage.getItem("token");

  const resposta = await fetch(
    "http://localhost:3000/tarefas",
    {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }
  );

  const tarefas = await resposta.json();

  const container =
    document.getElementById("containerTarefas");

  container.innerHTML = "";

  tarefas.forEach(tarefa => {

    container.innerHTML += `

      <div class="card">

        <h3>${tarefa.titulo}</h3>

        <p>${tarefa.descricao}</p>

        <p>
          Categoria:
          ${tarefa.categoria}
        </p>

        <p>
          Dificuldade:
          ${tarefa.nivel_dificuldade}
        </p>

        <p>
          Profissional:
          ${tarefa.profissional_nome}
        </p>

        <button
          onclick="assumirTarefa(
            ${tarefa.id_tarefa}
          )"
        >
          Assumir Tarefa
        </button>

      </div>

    `;
  });

}

// =========================
// ASSUMIR TAREFA
// =========================

async function assumirTarefa(id) {

  const token =
    localStorage.getItem("token");

  const resposta = await fetch(
    `http://localhost:3000/tarefas/${id}/assumir`,
    {
      method: "PUT",

      headers: {
        "Authorization": `Bearer ${token}`
      }
    }
  );

  const dados = await resposta.json();

  alert(dados.mensagem);

  carregarTarefas();

  carregarMinhasTarefas();

}

// =========================
// MINHAS TAREFAS
// =========================

async function carregarMinhasTarefas() {

  const token =
    localStorage.getItem("token");

  const resposta = await fetch(
    "http://localhost:3000/tarefas/minhas",
    {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }
  );

  const tarefas = await resposta.json();

  const container =
    document.getElementById(
      "containerMinhasTarefas"
    );
  if (Array.isArray(tarefas)) {
    console.log(tarefas)
    tarefas.forEach((tarefa) => {
      container.innerHTML += `

   <div class="atividade-box">

      <h3>
         ${tarefa.titulo}
      </h3>

      <textarea
         id="resposta-${tarefa.id_tarefa}"
         placeholder="
Descreva seu projeto ou envie o link do GitHub...
         "
      ></textarea>

      <input
         type="file"
         id="arquivo-${tarefa.id_tarefa}"
         class="input-arquivo"
      >

      <button
         type="button"
         onclick="
            enviarProjeto(
               ${tarefa.id_tarefa}
            )
         "
      >
         Enviar atividade
      </button>

   </div>

`;
    })

  } else {

    console.log("Não veio array:");
    console.log(tarefas);

  }



};




// =========================
// ENVIAR ENTREGA
// =========================

async function enviarProjeto(
  id_tarefa
) {

  const token =
    localStorage.getItem("token");

  const respostaTexto =
    document.getElementById(
      `resposta-${id_tarefa}`
    ).value;

  const arquivo =
    document.getElementById(
      `arquivo-${id_tarefa}`
    ).files[0];

  const formData =
    new FormData();

  formData.append(
    "id_tarefa",
    id_tarefa
  );

  formData.append(
    "codigo_texto",
    respostaTexto
  );

  if (arquivo) {

    formData.append(
      "arquivo",
      arquivo
    );

  }

  const resposta = await fetch(

    "http://localhost:3000/entregas",

    {

      method: "POST",

      headers: {
        "Authorization":
          `Bearer ${token}`
      },

      body: formData

    }

  );

  const dados =
    await resposta.json();

  alert(
    dados.mensagem ||
    dados.erro
  );

}

// =========================
// HISTÓRICO
// =========================

async function carregarHistorico() {

  const token =
    localStorage.getItem("token");

  const resposta = await fetch(
    "http://localhost:3000/historico",
    {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }
  );

  const historico = await resposta.json();

  const container =
    document.getElementById(
      "containerHistorico"
    );

  container.innerHTML = "";

  historico.forEach(item => {

    container.innerHTML += `

      <div class="card">

        <h3>${item.titulo}</h3>

        <p>
          Status:
          ${item.status_final_tarefa}
        </p>

        <p>
          Pontos:
          ${item.pontuacao_ganha}
        </p>

      </div>

    `;
  });

}

// =========================
// PONTUAÇÃO
// =========================

async function carregarPontuacao() {

  const token =
    localStorage.getItem("token");

  const resposta = await fetch(
    "http://localhost:3000/aprendizes/pontuacao",
    {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }
  );

  const dados = await resposta.json();

  document.getElementById(
    "pontuacaoValor"
  ).innerText = dados.pontuacao;

}

// =========================
// RANKING
// =========================

async function carregarRanking() {

  const token =
    localStorage.getItem("token");

  const resposta = await fetch(
    "http://localhost:3000/ranking",
    {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }
  );

  const ranking = await resposta.json();

  const container =
    document.getElementById(
      "containerRanking"
    );

  container.innerHTML = "";

  ranking.forEach((aprendiz, index) => {

    container.innerHTML += `

      <div class="ranking-item">

        <span>
          #${index + 1}
          -
          ${aprendiz.nome}
        </span>

        <strong>
          ${aprendiz.pontuacao}
          pts
        </strong>

      </div>

    `;
  });

}

// =========================
// LOGOUT
// =========================

function logout() {

  localStorage.removeItem("token");

  localStorage.removeItem("usuario");

  window.location.href = "index.html";

}

// =========================
// INICIAR
// =========================

carregarTarefas();

carregarMinhasTarefas();

carregarHistorico();

carregarPontuacao();

carregarRanking();