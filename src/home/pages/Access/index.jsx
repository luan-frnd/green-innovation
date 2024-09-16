
import '../Access/style.css'
import Logo from "../img/logo.png"
import Icon from "../img/icon.png"
import Home from "../img/home.png"
import { Link } from "react-router-dom";

function access() {
  
  return (
    
    <div className='container-lg'>
        
          
    <form >
    
    <div id="img-lg">
      <div className="logo-lg">
        <img src={Logo}  alt="logo do site" />
      </div>

       <div className="icon-lg">
        <img src={Icon} alt="icon-de-home" />
        </div>

    </div>

     <div id="content-lg">

     
  
       <div className="title-lg">
         <h1> Login </h1>   
          <div className="home-lg">
             <Link to={"/"}><img src={Home} alt="icone para voltar na tela de inicio" /></Link>
           </div>
       </div>
      
  
       <div className="content-form-lg">
         
                 <div className="content-lg">
         <label>E-mail</label>
           <input name='idade' type="email" placeholder='exemplo@gmail.com'/>
                 </div>
         <div className="content-lg">
           <label>senha</label>
           <input name='email' type="password" placeholder='Digite sua senha'/>
         </div>
         
         <button type='button' >Cadastra</button>
       </div>
       <p>Não tem uma conta?<Link to={"/cadastro"} className='page-rg'> cadastre-se</Link></p>
     </div>
    </form>
  </div>
  )
}

export default access
