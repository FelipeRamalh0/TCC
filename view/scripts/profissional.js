
    // =========================
    // TROCAR SEÇÕES
    // =========================

    function mostrarSecao(secaoId){

      const secoes = document.querySelectorAll(".section");

      secoes.forEach(secao => {
        secao.classList.remove("active");
      });

      document.getElementById(secaoId)
        .classList.add("active");
    }

    // =========================
    // CRIAR TAREFA
    // =========================

    const formTarefa =
      document.getElementById("formTarefa");

    formTarefa.addEventListener("submit",
      async function(e){

      e.preventDefault();

      const token =
        localStorage.getItem("token");

      const titulo =
        document.getElementById("titulo").value;

      const descricao =
        document.getElementById("descricao").value;

      const nivel =
        document.getElementById("nivel").value;

      const categoria =
        document.getElementById("categoria").value;

      try{

        const resposta = await fetch(
          "http://localhost:3000/tarefas",
          {
            method:"POST",

            headers:{
              "Content-Type":"application/json",
              "Authorization":`Bearer ${token}`
            },

            body:JSON.stringify({
              titulo,
              descricao,
              categoria,
              nivel_dificuldade:nivel
            })
          }
        );

        const dados = await resposta.json();

        alert(dados.mensagem);

        carregarTarefas();

      }catch(erro){

        console.log(erro);

      }

    });

    // =========================
    // LISTAR TAREFAS
    // =========================

    async function carregarTarefas(){

      const token =
        localStorage.getItem("token");

      const resposta = await fetch(
        "http://localhost:3000/tarefas/profissional",
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
              Dificuldade:
              ${tarefa.nivel_dificuldade}
            </p>

            <p>
              Status:
              ${tarefa.status_tarefa}
            </p>

          </div>

        `;
      });

    }

    // =========================
    // LISTAR ENTREGAS
    // =========================

    async function carregarAvaliacoes(){

      const token =
        localStorage.getItem("token");

      const resposta = await fetch(
        "http://localhost:3000/entregas",
        {
          headers:{
            "Authorization":`Bearer ${token}`
          }
        }
      );

      const entregas = await resposta.json();

      const container =
        document.getElementById("containerAvaliacoes");

      container.innerHTML = "";

      entregas.forEach(entrega => {

        container.innerHTML += `

          <div class="card">

            <h3>${entrega.titulo}</h3>

            <p>
              Aprendiz:
              ${entrega.aprendiz_nome}
            </p>

            <p>
              ${entrega.codigo_texto || ""}
            </p>

            <button
              class="aprovar"
              onclick="avaliarEntrega(
                ${entrega.id_entrega},
                'Aprovado'
              )"
            >
              Aprovar
            </button>

            <button
              class="reprovar"
              onclick="avaliarEntrega(
                ${entrega.id_entrega},
                'Rejeitado'
              )"
            >
              Reprovar
            </button>

          </div>

        `;
      });

    }

    // =========================
    // APROVAR / REPROVAR
    // =========================

    async function avaliarEntrega(id, status){

      const token =
        localStorage.getItem("token");

      await fetch(
        `http://localhost:3000/entregas/${id}`,
        {
          method:"PUT",

          headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
          },

          body:JSON.stringify({
            status_entrega:status
          })
        }
      );

      carregarAvaliacoes();

    }

    // =========================
    // BIO
    // =========================

    async function salvarBio(){

      const token =
        localStorage.getItem("token");

      const bio =
        document.getElementById("bio").value;

      const resposta = await fetch(
        "http://localhost:3000/profissionais/bio",
        {
          method:"PUT",

          headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
          },

          body:JSON.stringify({
            bio
          })
        }
      );

      const dados = await resposta.json();

      alert(dados.mensagem);

    }

    // =========================
    // LOGOUT
    // =========================

    function logout(){

      localStorage.removeItem("token");

      window.location.href = "index.html";

    }

    // =========================
    // INICIAR
    // =========================

    carregarTarefas();

    carregarAvaliacoes();
