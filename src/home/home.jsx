import Logo from './pages/img/logo2.png'
import { Link } from 'react-router-dom';
import Grafic from '../home/pages/components/index'
import '../home/home.css'


function Main() {
  return (
    <div className="container-home">
        <nav className='navbar'>
          <img src={Logo} alt="" />
          <ul>
            <li>Home</li>
            <li>Economia</li>
            <li>Contato</li>
            <li><Link to={'/login do usuario'} className='lg-rg'>Login/Cadastro</Link></li>
          </ul>
        </nav>
        
        <main> 
          <section className='grafic'>
            <Grafic/>

            
          </section>
          </main>
    </div>
  );
}

export default Main;