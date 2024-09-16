import './style.css';
import Logo from "../img/logo.png"
import Icon from "../img/icon.png"
import Home from "../img/home.png"
import { Link } from "react-router-dom";


function register() {

  return (
    
        <div className='container-rg'>
        
          
            <form >
            
            <div id="img">
              <div className="logo">
                <img src={Logo}  alt="logo do site" />
              </div>

               <div className="icon">
                <img src={Icon} alt="icon-de-home" />
                </div>

            </div>

             <div id="content">

             
          
               <div className="title">
                 <h1> Cadastro </h1>   
                  <div className="home">
                     <Link to={"/"}><img src={Home} alt="icone para voltar na tela de inicio" /></Link>
                   </div>
               </div>
              
          
               <div className="content-form">
                 <div className="content">
                   <label>Nome</label>
                   <input name='nome' type="nome" placeholder='exemplo' />
                 </div>
                         <div className="content">
                 <label>E-mail</label>
                   <input name='idade' type="email" placeholder='exemplo@gmail.com'/>
                         </div>
                 <div className="content">
                   <label>senha</label>
                   <input name='email' type="password" placeholder='Digite sua senha'/>
                 </div>
                 
                 <div className="content">
                   <label>Confime a senha</label>
                   <input name='senha' type="password" maxLength={16} placeholder='Digite novamente'/>
                 </div>
                 <button type='button' >Cadastra</button>
               </div>
               <p>Já tem uma conta?<Link to={"/login do usuario"} className='page-lg'> Entrar</Link></p>
             </div>
            </form>
          </div>
  )
}

export default register
