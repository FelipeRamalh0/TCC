// =========================
// CARREGAR DADOS
// =========================

document.addEventListener("DOMContentLoaded", () => {

  const usuario = JSON.parse(
    localStorage.getItem("usuarioLogado")
  );

  if (!usuario) {
    alert("Nenhum usuário logado.");
    return;
  }

  // CAMPOS DO FORMULÁRIO

  const nome = document.getElementById("nome");
  const email = document.getElementById("email");
  const telefone = document.getElementById("telefone");
  const empresa = document.getElementById("empresa");
  const cargo = document.getElementById("cargo");
  const linkedin = document.getElementById("linkedin");
  const github = document.getElementById("github");
  const bio = document.getElementById("bio");

  if (nome) nome.value = usuario.nome || "";
  if (email) email.value = usuario.email || "";
  if (telefone) telefone.value = usuario.telefone || "";
  if (empresa) empresa.value = usuario.empresa || "";
  if (cargo) cargo.value = usuario.cargo || "";
  if (linkedin) linkedin.value = usuario.linkedin || "";
  if (github) github.value = usuario.github || "";
  if (bio) bio.value = usuario.bio || "";

  // CARD PERFIL

  const nomePerfil =
    document.getElementById("nomePerfil");

  const cargoPerfil =
    document.getElementById("cargoPerfil");

  const emailPerfil =
    document.getElementById("emailPerfil");

  const telefonePerfil =
    document.getElementById("telefonePerfil");

  const empresaPerfil =
    document.getElementById("empresaPerfil");

  if (nomePerfil)
    nomePerfil.textContent =
      usuario.nome || "Profissional";

  if (cargoPerfil)
    cargoPerfil.textContent =
      usuario.cargo || "Profissional";

  if (emailPerfil)
    emailPerfil.textContent =
      usuario.email || "Não informado";

  if (telefonePerfil)
    telefonePerfil.textContent =
      usuario.telefone || "Não informado";

  if (empresaPerfil)
    empresaPerfil.textContent =
      usuario.empresa || "Não informado";

  // FOTO

  const foto = document.querySelector(".foto-preview");

  if (foto && usuario.foto) {
    foto.src = usuario.foto;
  }

});

// =========================
// SALVAR PERFIL
// =========================

function salvarPerfil() {

  const usuario = JSON.parse(
    localStorage.getItem("usuarioLogado")
  ) || {};

  usuario.nome =
    document.getElementById("nome")?.value || "";

  usuario.email =
    document.getElementById("email")?.value || "";

  usuario.telefone =
    document.getElementById("telefone")?.value || "";

  usuario.empresa =
    document.getElementById("empresa")?.value || "";

  usuario.cargo =
    document.getElementById("cargo")?.value || "";

  usuario.linkedin =
    document.getElementById("linkedin")?.value || "";

  usuario.github =
    document.getElementById("github")?.value || "";

  usuario.bio =
    document.getElementById("bio")?.value || "";

  const novaSenha =
    document.getElementById("novaSenha")?.value || "";

  const confirmarSenha =
    document.getElementById("confirmarSenha")?.value || "";

  if (novaSenha !== "") {

    if (novaSenha !== confirmarSenha) {

      alert("As senhas não coincidem.");
      return;

    }

    usuario.senha = novaSenha;
  }

  localStorage.setItem(
    "usuarioLogado",
    JSON.stringify(usuario)
  );

  // ATUALIZA CARD

  const nomePerfil =
    document.getElementById("nomePerfil");

  const cargoPerfil =
    document.getElementById("cargoPerfil");

  const emailPerfil =
    document.getElementById("emailPerfil");

  const telefonePerfil =
    document.getElementById("telefonePerfil");

  const empresaPerfil =
    document.getElementById("empresaPerfil");

  if (nomePerfil)
    nomePerfil.textContent = usuario.nome;

  if (cargoPerfil)
    cargoPerfil.textContent = usuario.cargo;

  if (emailPerfil)
    emailPerfil.textContent = usuario.email;

  if (telefonePerfil)
    telefonePerfil.textContent = usuario.telefone;

  if (empresaPerfil)
    empresaPerfil.textContent = usuario.empresa;

  alert("Perfil atualizado com sucesso!");

}

// =========================
// FOTO DE PERFIL
// =========================

const fotoInput =
  document.getElementById("fotoPerfil");

if (fotoInput) {

  fotoInput.addEventListener(
    "change",
    function (e) {

      const arquivo = e.target.files[0];

      if (!arquivo) return;

      const leitor = new FileReader();

      leitor.onload = function () {

        const foto =
          document.querySelector(".foto-preview");

        if (foto) {
          foto.src = leitor.result;
        }

        const usuario = JSON.parse(
          localStorage.getItem("usuarioLogado")
        ) || {};

        usuario.foto = leitor.result;

        localStorage.setItem(
          "usuarioLogado",
          JSON.stringify(usuario)
        );

      };

      leitor.readAsDataURL(arquivo);

    }
  );

}

// =========================
// EXCLUIR CONTA
// =========================

function excluirConta() {

  const confirmacao = prompt(
    "Digite EXCLUIR para confirmar a exclusão da conta."
  );

  if (confirmacao !== "EXCLUIR") {

    alert("Operação cancelada.");
    return;

  }

  localStorage.removeItem("usuarioLogado");

  alert("Conta excluída com sucesso!");

  window.location.href =
    "../pages/login.html";

}