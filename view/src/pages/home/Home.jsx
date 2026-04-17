import './style.css'
function Home(){

    return (
        <div className='container'>
            <form>
                <h1>Cadastrar</h1>
                <input name='nome' type='text'/>
                <input name='email' type='email'/>
                <input name='idade' type='number'/>
                <input name='gênero' type='text'/>
            <button type='button'>Cadastrar</button>
            </form>
        </div>
        
    )
}

export default Home