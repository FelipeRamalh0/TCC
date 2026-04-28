import "./Cadastro.css";

// Recebe a função vinda do App.jsx
function Cadastro({ irParaLogin }) {
  return (
    <div className="container">
      <div className="card">
        <form>
          <h1>Cadastrar</h1>
          <p>Preencha os campos abaixo para criar sua conta</p>

          <input type="text" placeholder="Insira seu nome" />

          <input type="email" placeholder="Coloque seu Email" />

          <input type="password" placeholder="Digite sua senha" />

          <input
            type="number"
            placeholder="Coloque sua idade"
            min="10"
            max="100"
          />

          <select>
            <option>Selecione o seu nível</option>
            <option>Aprendiz</option>
            <option>Profissional</option>
          </select>

          <button type="submit">Cadastrar</button>
          <p style={{ fontSize: "14px", color: "#555" }}>
            Já tem uma conta?{" "}
            <span onClick={irParaLogin} className="login-link">
              Faça login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Cadastro;
