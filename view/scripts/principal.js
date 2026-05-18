/* FOTO PERFIL */

    const fotoInput = document.getElementById("fotoInput");
    const preview = document.getElementById("preview");

    fotoInput.addEventListener("change", function(){

        const arquivo = this.files[0];

        if(arquivo){

            const leitor = new FileReader();

            leitor.onload = function(e){
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

    function abrirAtividade(titulo, descricao){

        atividadeBox.style.display = "block";

        tituloAtividade.innerText = titulo;
        descricaoAtividade.innerText = descricao;
    }

    function concluirAtividade(){

        if(progressoAtual < 100){

            progressoAtual += 10;

            if(progressoAtual > 100){
                progressoAtual = 100;
            }

            barra.style.width = progressoAtual + "%";

            textoProgresso.innerText =
                progressoAtual + "% concluído";

            alert("Atividade concluída com sucesso!");
        }
    }


    /* TIPO DE USUARIO */

    const tipoUsuario = "profissional";
    /*
    troque para:
    "aprendiz"
    ou
    "profissional"
    */

    const areaProfessor = document.getElementById("areaProfessor");

    if(tipoUsuario === "profissional"){

        areaProfessor.style.display = "block";

    }else{

        areaProfessor.style.display = "none";
    }


    /* CRIAR DESAFIOS */

    const listaDesafios = document.getElementById("listaDesafios");

    function criarDesafio(){

        const titulo = document.getElementById("tituloDesafio").value;

        const descricao = document.getElementById("descricaoDesafio").value;

        if(titulo === "" || descricao === ""){

            alert("Preencha todos os campos!");
            return;
        }

        const novoCard = document.createElement("div");

        novoCard.classList.add("step");

        novoCard.innerHTML = `
        
            <span>🆕</span>

            <p>${titulo}</p>

        `;

        novoCard.onclick = function(){

            abrirAtividade(titulo, descricao);
        }

        listaDesafios.appendChild(novoCard);

        document.getElementById("tituloDesafio").value = "";
        document.getElementById("descricaoDesafio").value = "";

        alert("Desafio publicado com sucesso!");
    }


    /* ABRIR PAINEL PROFESSOR */

    const painelProfessor = document.getElementById("painelProfessor");

    function abrirPainelProfessor(){

        painelProfessor.style.display = "block";

        painelProfessor.scrollIntoView({
            behavior: "smooth"
        });
    }