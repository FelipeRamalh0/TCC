// =========================
// TROCAR SEÇÕES
// =========================

function mostrarSecao(secaoId){

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

async function carregarTarefas(){

  const token =
    localStorage.getItem("token");

  const resposta = await fetch(
    "http://localhost:3000/tarefas",
    {
      headers:{
        "Authorization":`Bearer ${token}`
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

async function assumirTarefa(id){

  const token =
    localStorage.getItem("token");

  const resposta = await fetch(
    `http://localhost:3000/tarefas/${id}/assumir`,
    {
      method:"PUT",

      headers:{
        "Authorization":`Bearer ${token}`
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

async function carregarMinhasTarefas(){

  const token =
    localStorage.getItem("token");

  const resposta = await fetch(
    "http://localhost:3000/tarefas/minhas",
    {
      headers:{
        "Authorization":`Bearer ${token}`
      }
    }
  );

  const tarefas = await resposta.json();

  const container =
    document.getElementById(
      "containerMinhasTarefas"
    );

  container.innerHTML = "";

  tarefas.forEach(tarefa => {

    container.innerHTML += `

      <div class="card">

        <h3>${tarefa.titulo}</h3>

        <p>${tarefa.descricao}</p>

        <p>
          Status:
          ${tarefa.status_tarefa}
        </p>

        <button
          onclick="
            abrirModalEntrega(
              ${tarefa.id_tarefa}
            )
          "
        >
          Enviar Resposta
        </button>

      </div>

    `;
  });

}

// =========================
// ABRIR MODAL
// =========================

function abrirModalEntrega(id){

  tarefaSelecionada = id;

  document.getElementById(
    "modalEntrega"
  ).style.display = "flex";

}

// =========================
// FECHAR MODAL
// =========================

function fecharModal(){

  document.getElementById(
    "modalEntrega"
  ).style.display = "none";

}

// =========================
// ENVIAR ENTREGA
// =========================

async function enviarEntrega(){

  const token =
    localStorage.getItem("token");

  const codigo =
    document.getElementById(
      "codigoEntrega"
    ).value;

  const github =
    document.getElementById(
      "githubEntrega"
    ).value;

  const resposta = await fetch(
    "http://localhost:3000/entregas",
    {
      method:"POST",

      headers:{
        "Content-Type":"application/json",
        "Authorization":`Bearer ${token}`
      },

      body:JSON.stringify({

        id_tarefa:tarefaSelecionada,

        codigo_texto:codigo,

        link_repositorio:github

      })
    }
  );

  const dados = await resposta.json();

  alert(dados.mensagem);

  fecharModal();

}

// =========================
// HISTÓRICO
// =========================

async function carregarHistorico(){

  const token =
    localStorage.getItem("token");

  const resposta = await fetch(
    "http://localhost:3000/historico",
    {
      headers:{
        "Authorization":`Bearer ${token}`
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

async function carregarPontuacao(){

  const token =
    localStorage.getItem("token");

  const resposta = await fetch(
    "http://localhost:3000/aprendizes/pontuacao",
    {
      headers:{
        "Authorization":`Bearer ${token}`
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

async function carregarRanking(){

  const token =
    localStorage.getItem("token");

  const resposta = await fetch(
    "http://localhost:3000/aprendizes/ranking",
    {
      headers:{
        "Authorization":`Bearer ${token}`
      }
    }
  );

  const ranking = await resposta.json();

  const container =
    document.getElementById(
      "containerRanking"
    );

  container.innerHTML = "";

  ranking.forEach((aprendiz,index) => {

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

function logout(){

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