import './Cadastro.css'

function Cadastro(){

    return (
        <div className='container'>
            <form>
                <h1>Cadastrar</h1>
                <input name='nome' type='text' placeholder='Insira seu nome'/>
                <input name='email' type='email' placeholder='Coloque seu Email'/>
                <input name='senha' type='password' placeholder='Digite sua senha'/>

                <input name='idade' type='number' placeholder='Coloque sua idade'
                min='10' max='100'/>
              
            
                <select name="tipo">
                    <option value="">Selecione o seu nível</option>                  
                    <option value="iniciante">Iniciante</option>
                    <option value="intermediario">Intermediário</option>
                    <option value="profissional">Profissional</option>
                </select>

            <button type='button'>Cadastrar</button>
            </form>
        </div>
        
    )
}

export default Cadastro