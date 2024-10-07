import './style.css';
import Logo from "../img/logo.png";
import Icon from "../img/icon.png";
import Home from "../img/home.png";
import { Link, useNavigate } from "react-router-dom"; // Importa useNavigate
import { useState } from 'react';
import axios from 'axios';

function Access() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Inicializa o hook de navegação

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:3001/login', {
                email,
                password
            });
            const { token } = response.data;
            alert('Login realizado com sucesso!');
            localStorage.setItem('token', token);

            // Redireciona para a página de home após o login
            navigate('/');
        } catch (error) {
            alert('Erro ao realizar login');
        }
    };

    return (
        <div className='container-lg'>
            <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
                <div id="img-lg">
                    <div className="logo-lg">
                        <img src={Logo} alt="logo do site" />
                    </div>
                    <div className="icon-lg">
                        <img src={Icon} alt="icon-de-home" />
                    </div>
                </div>
                <div id="content-lg">
                    <div className="title-lg">
                        <h1>Login</h1>
                        <div className="home-lg">
                            <Link to={"/"}><img src={Home} alt="icone para voltar na tela de inicio" /></Link>
                        </div>
                    </div>
                    <div className="content-form-lg">
                        <div className="content-lg">
                            <label>E-mail</label>
                            <input
                                name='email'
                                type="email"
                                placeholder='exemplo@gmail.com'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="content-lg">
                            <label>Senha</label>
                            <input
                                name='password'
                                type="password"
                                placeholder='Digite sua senha'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button type='submit'>Entrar</button>
                    </div>
                    <p>Não tem uma conta?<Link to={"/cadastro"} className='page-rg'> cadastre-se</Link></p>
                </div>
            </form>
        </div>
    )
}

export default Access;