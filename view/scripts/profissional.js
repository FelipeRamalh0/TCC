window.onload = () => {
  carregarAtividades();
  carregarEntregas();
  carregarAprendizes();
  atualizarAprendizesAtivos();
};

/* =========================
   TROCA DE PÁGINA
========================= */
async function trocarPagina(pagina) {

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
async function criarAtividade() {


   const token = localStorage.getItem("token");
  const titulo = document.getElementById("titulo").value;
  const descricao = document.getElementById("descricao").value;
  const nivel= document.getElementById("nivel").value;
  const categoria= document.getElementById("categoria").value;


 

  if (!titulo || !descricao || !nivel || !categoria) {
    alert("Preencha todos os campos!");
    return;
  }
try {

  const resposta= await fetch(`http://localhost:3000/tarefas`,{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(
      {
         titulo,
    descricao,
    nivel_dificuldade: nivel, 
    categoria,
    status: "aberta"
      }
    )
  });

  const dados= await resposta.json();

  localStorage.setItem("atividades", JSON.stringify(atividades));

  alert("Atividade criada!");

  document.getElementById("titulo").value = "";
  document.getElementById("descricao").value = "";
  document.getElementById("nivel").value = "";
  document.getElementById("categoria").value = "";
carregarAtividades();
} catch (error) {
  console.error("Erro ao criar atividade", error)
}
  
 
}

/* =========================
   LISTAR ATIVIDADES
========================= */
async function carregarAtividades() {
const token= localStorage.getItem("token");

 const resposta = await fetch(
        "http://localhost:3000/tarefas/profissional",
        {
          headers:{
            "Authorization":`Bearer ${token}`
          }
        }
      );
const lista = document.getElementById("listaAtividades");
  lista.innerHTML = "";
  const atividades= await resposta.json();

  atividades.forEach((a) => {

    lista.innerHTML += `
      <div class="atividade">
        <h3>${a.titulo}</h3>
        <p>${a.descricao}</p>
        <p>${a.nivel_dificuldade}</p>
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
async function excluirAtividade(index) {

  let atividades = JSON.parse(localStorage.getItem("atividades")) || [];

  atividades.splice(index, 1);

  localStorage.setItem("atividades", JSON.stringify(atividades));

  carregarAtividades();
}

/* =========================
   ENTREGAS
========================= */
async function carregarEntregas() {

  const token= localStorage.getItem("token")
  const resposta = await fetch(
        "http://localhost:3000/entregas",
        {
          headers:{
            "Authorization":`Bearer ${token}`
          }
        }
      );
 const area = document.getElementById("desempenho");
  area.innerHTML = "";
      const entregas = await resposta.json();

  entregas.forEach((e, index) => {

    area.innerHTML += `
      <div class="atividade entrega">

        <div class="topo-entrega">
          <h3>${e.titulo}</h3>
          <p>
              Aprendiz:
              ${entrega.aprendiz_nome}
            </p>
          <span class="status ${e.status === "Aprovado" ? "aprovado" : "pendente"}">
            ${e.status}
          </span>
        </div>

        <div class="codigo-box">
          <p>${e.codigo_texto || ""}</p>
          <strong>Arquivo:</strong>
          <p>${e.arquivo || ""}</p>
        </div>

        <textarea id="feedback-${index}" class="feedback-input"></textarea>

        <button
              class="aprovar"
              onclick="avaliarEntrega(
                ${e.id_entrega},
                'Aprovado'
              )"
            >
              Aprovar
            </button>

            <button
              class="reprovar"
              onclick="avaliarEntrega(
                ${e.id_entrega},
                'Rejeitado'
              )"
            >
              Reprovar
            </button>
          <button class="btn-feedback" onclick="enviarFeedback(${index})">Feedback</button>
        </div>

      </div>
    `;
  });
}

/* =========================
   APROVAR/REPROVAR
========================= */
async function aprovarAtividade(index) {
const token =localStorage.getItem("token");
 await fetch(
        `http://localhost:3000/entregas/${id}/status`,
        {
          method:"PUT",

          headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
          },

          body:JSON.stringify({
            status :status
          })
        }
      );

      carregarAvaliacoes();

/* =========================
   FEEDBACK
========================= */
async function enviarFeedback(index) {

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
async function carregarAprendizes() {

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
async function atualizarAprendizesAtivos() {

  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  const total = usuarios.filter(u => u.tipo === "aprendiz").length;

  const el = document.getElementById("totalAprendizes");

  if (el) {
    el.innerText = total;
  }
}}
//LOGOUT
   function logout(){

      localStorage.removeItem("token");

      window.location.href = "index.html";
   }