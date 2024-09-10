import './style.css'


function access() {
  
  return (
      <div className='container'>
        <form >
         <h1> Login </h1>
         <div className="content">
           <label>Nome</label>
           <input name='nome' type="nome" />
         </div>
         <div className="content">
           <label>Senha</label>
           <input name='senha' type="senha" maxLength={16}/>
         </div>
         <button type='button'>Entrar</button>
         <p>
          <a href="#">Criar uma conta</a>
         </p>
        </form>

      </div>

  )
}

export default access
