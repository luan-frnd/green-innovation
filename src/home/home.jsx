import Logo from './pages/img/logo2.png'
import { Link } from 'react-router-dom';
import Grafic from '../home/pages/components/index'
import Calculo from '../home/pages/components/calculo'

import '../home/home.css'


function Main() {
  return (
    <div className="container-home">
        <nav className='navbar'>
          <img src={Logo} alt="" />
          
          <ul>
            <li ><a href="https://chat.whatsapp.com/HLutfQiUb095o6oI29HW0m" target='_blank'>Contato</a></li>
            <li><Link to={'/login do usuario'} className='lg-rg'>Login/ Cadastro <i class="bi bi-box-arrow-in-right"></i></Link>     </li>
          </ul>
        </nav>
        
        <main> 
          <section className='grafic'>
            <Grafic/>
            
          </section>
          <section className='calculo'>
            <Calculo/>
          </section>
          </main>
    </div>
  );
}

export default Main;