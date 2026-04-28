import { useState } from "react";
import Cadastro from "./pages/cadastro/Cadastro.jsx";
import Login from "./pages/login/Login.jsx";

function App() {
  const [tela, setTela] = useState("cadastro");

  return (
    <div>
      {tela === "cadastro" && (
        <Cadastro irParaLogin={() => setTela("login")} />
      )}

      {tela === "login" && (
        <Login irParaCadastro={() => setTela("cadastro")} />
      )}
    </div>
  );
}

export default App;