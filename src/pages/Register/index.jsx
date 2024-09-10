import './style.css'

function access() {
  
  return (
      <div className='container'>
        <form >
         <h1> Cadastro </h1>
         <div className="content">
           <label>Nome</label>
           <input name='nome' type="nome" />
         </div>
       <div className="content">
         <label>Idade</label>
           <input name='idade' type="number" />
       </div>
         <div className="content">
           <label>Email</label>
           <input name='email' type="email" />
         </div>
         <div className="content">
           <label>Senha</label>
           <input name='senha' type="senha" maxLength={16}/>
         </div>
         <button type='button'>Cadastra</button>
        </form>
      </div>

  )
}

export default access
