// Importa o arquivo de estilos (CSS)
import './Cadastro.css'

// Criação do componente Cadastro
function Cadastro() {

    // O return define o que será exibido na tela
    return (

        // Container principal (fundo da tela)
        <div className="container">

            {/* Card central (caixa branca onde fica o formulário) */}
            <div className="card">

                {/* Formulário de cadastro */}
                <form>

                    {/* Título principal */}
                    <h1>Cadastrar</h1>

                    {/* Texto de apoio */}
                    <p>Preencha os campos abaixo para criar sua conta</p>

                    {/* Campo para digitar o nome */}
                    <input 
                        type="text" 
                        placeholder="Insira seu nome" 
                    />

                    {/* Campo de email (já valida formato automaticamente) */}
                    <input 
                        type="email" 
                        placeholder="Coloque seu Email" 
                    />

                    {/* Campo de senha (texto oculto) */}
                    <input 
                        type="password" 
                        placeholder="Digite sua senha" 
                    />

                    {/* Campo numérico para idade */}
                    <input 
                        type="number" 
                        placeholder="Coloque sua idade" 
                        min="10"  // valor mínimo permitido
                        max="100" // valor máximo permitido
                    />

                    {/* Campo de seleção (dropdown) */}
                    <select>

                        {/* Opção padrão */}
                        <option>Selecione o seu nível</option>

                        {/* Opções disponíveis */}
                        <option>Iniciante</option>
                        <option>Intermediário</option>
                        <option>Profissional</option>

                    </select>

                    {/* Botão de envio do formulário */}
                    <button type="submit">
                        Cadastrar
                    </button>

                    {/* Texto com link para login */}
                    <span>
                        Já tem uma conta? <a href="#">Faça login</a>
                    </span>

                    <span><a href="forgot"></a></span>

                
                </form>
            </div>
        </div>
    )
}

// Exporta o componente para poder usar em outros arquivos
export default Cadastro