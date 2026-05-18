const form = document.querySelector("form");

    form.addEventListener("submit", function(event){

        event.preventDefault();

        const novaSenha = document.querySelector('input[name="nova_senha"]').value;

        const confirmarSenha = document.querySelector('input[name="confirmar_senha"]').value;

        if(novaSenha !== confirmarSenha){

            alert("As senhas não coincidem!");
            return;

        }

        alert("Senha alterada com sucesso!");

        window.location.href = "../pages/cadastrar.html";

    });