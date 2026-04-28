import './Login.css'

function Login({irParaCadastro}) {
    return(
        <div className='container2'>

            <form>
                <h1>Login</h1>
             <p>Faça login para acessar sua conta</p>
             <input type="text" placeholder="Digite seu nome"/>

              <input type="email" placeholder="Digite seu email"/>

               <input type="password" placeholder="Digite sua senha"/>
            <p><a href="#">Esqueceu sua senha?</a></p>
            </form>

            <span
                onClick={irParaCadastro}
                style={{ color: "blue", cursor: "pointer", textDecoration: "underline" }}
                >
                    Não tem conta? Cadastre-se
            </span>
            
     </div>
    )
}

export default Login