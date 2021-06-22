import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

import { connect } from 'react-redux'
import * as LoginActions from '../../store/actions/login'

import Logo from '../../assets/images/monitoriaAgenda.png';

const Login = ({ dispatch }) => {
    const [email, setUsuario] = useState("");
    const [senha, setPassword] = useState("");
    const [user, setUser] = useState();
    const [erro, setErro] = useState('');

    function mostrarSenha() {
        var x = document.getElementById("senha");

        if (x.type === "password") {
            x.type = "text";
        } else {
            x.type = "password";
        }
    }

    const handleSubmit = async e => {
        e.preventDefault();

        const userForm = { email, senha };

        await fetch(`http://localhost:5000/home/login`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userForm)
        })
            .then(
                resp => {
                    if (resp.ok) {
                        // console.log(resp.json());
                        resp.json().then((data) => {
                            console.log('data.user.email: ' + data.user.email);
                            setUser(data);
                            dispatch(LoginActions.setLogin(data.user))
                        })
                    }
                    else {
                        console.log('Usuário inexistente ou servidor off-line.');
                        setErro("Usuário inexistente ou servidor off-line.");
                    }
                })
            .catch(function (error) {
                console.log('There has been a problem with your fetch operation: ' + error.message);
            })
    }

    return (
        user ? <Redirect to="/horarios" /> :
            <div className="container">
                <div className="container-login">
                    <img className="logo" src={Logo} alt="Logo Monitoria Agenda" />
                    <form onSubmit={handleSubmit}>
                        <h1>Login</h1>
                        <div className="textbox">
                            <FontAwesomeIcon icon={faEnvelope} className="icon" />
                            <input type="email" value={email} onChange={({ target }) => setUsuario(target.value)} name="" placeholder="E-mail" id="" pattern=".+@g.unicamp.br" />
                        </div>
                        <div className="textbox">
                            <FontAwesomeIcon icon={faLock} className="icon" />
                            <input type="password" value={senha} onChange={({ target }) => setPassword(target.value)} name="" placeholder="Senha" id="senha" />
                        </div>
                        <div className="mostrar">
                            <input type="checkbox" onClick={mostrarSenha} id="mostrar" /> <span className="txt">Mostrar Senha</span>
                            <span className="checkmark"></span>
                        </div>
                        <input className="botao" type="submit" value="Entrar" />
                        <p>
                            Não tem conta? <Link to="/cadastro"><b>Cadastre-se!</b></Link>
                        </p>
                        {
                            erro ?
                                <div>
                                    <FontAwesomeIcon icon={faExclamationTriangle} className="iconErro" />
                                    <div className="erro">
                                        <h4 className="msgErro">{erro}</h4>
                                    </div>
                                </div> :
                                <></>
                        }
                    </form>
                </div>
            </div>
    )

};
export default connect()(Login);