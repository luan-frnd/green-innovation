import './style.css';
import Logo from "../img/logo.png";
import Icon from "../img/icon.png";
import Home from "../img/home.png";
import { Link } from "react-router-dom";
import { useState } from 'react';
import axios from 'axios';

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegister = async () => {
        if (password !== confirmPassword) {
            alert('As senhas não correspondem!');
            return;
        }
        try {
            const response = await axios.post('http://localhost:3001/register', {
                name,
                email,
                password
            });
            alert('Usuário registrado com sucesso!');
        } catch (error) {
            alert('Erro ao registrar usuário');
        }
    };

    return (
        <div className='container-rg'>
            <form onSubmit={(e) => { e.preventDefault(); handleRegister(); }}>
                <div id="img">
                    <div className="logo">
                        <img src={Logo} alt="logo do site" />
                    </div>
                    <div className="icon">
                        <img src={Icon} alt="icon-de-home" />
                    </div>
                </div>
                <div id="content">
                    <div className="title">
                        <h1>Cadastro</h1>
                        <div className="home">
                            <Link to={"/"}><img src={Home} alt="icone para voltar na tela de inicio" /></Link>
                        </div>
                    </div>
                    <div className="content-form">
                        <div className="content">
                            <label>Nome</label>
                            <input
                                name='name'
                                type="text"
                                placeholder='exemplo'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="content">
                            <label>E-mail</label>
                            <input
                                name='email'
                                type="email"
                                placeholder='exemplo@gmail.com'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="content">
                            <label>Senha</label>
                            <input
                                name='password'
                                type="password"
                                maxLength={16}
                                placeholder='Digite sua senha'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="content">
                            <label>Confirme a senha</label>
                            <input
                                name='confirmPassword'
                                type="password"
                                maxLength={16}
                                
                                placeholder='Digite novamente'
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                        <button type='submit'><Link to={"/"}>Cadastrar</Link></button>
                    </div>
                    <p>Já tem uma conta?<Link to={"/login do usuario"} className='page-lg'> Entrar</Link></p>
                </div>
            </form>
        </div>
    )
}

export default Register;