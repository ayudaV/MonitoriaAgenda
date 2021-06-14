import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faExclamationTriangle, faUser } from '@fortawesome/free-solid-svg-icons';
import {connect} from 'react-redux';
import Logo from '../../assets/images/monitoriaAgenda.png';


const Cadastro = ({saldoDeMonitoria, role}) => {
    const [email, setUsuario] = useState("");
    const [apelido, setApelido] = useState("");
    const [senha, setPassword] = useState("");
    const [erro, setErro] = useState('');
    const cadastrado = false;

    const handleSubmit = async e => {
        e.preventDefault();

        const userForm = { email, senha, apelido, saldoDeMonitoria, role};

        await fetch(`http://localhost:5000/home/signup`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userForm)
        })
            .then(
                resp => {
                    console.log(JSON.stringify(userForm))
                    if (resp.ok) {
                        return cadastrado = true;
                    }
                    else {
                        console.log('E-mail já cadastrado ou servidor off-line.');
                        setErro("E-mail já cadastrado ou servidor off-line.");
                    }
                })
            .catch(function (error) {
                console.log('There has been a problem with your fetch operation: ' + error.message);
            })
    }
    return (
        <div className="container-login">
        <img className="logo" src={Logo} alt="Logo Monitoria Agenda" />
        <form onSubmit={handleSubmit}>
            <h1>Cadastro</h1>
            <div className="textbox">
                <FontAwesomeIcon icon={faEnvelope} className="icon" />
                <input type="email" value={email} onChange={({ target }) => setUsuario(target.value)} name="" placeholder="E-mail" id="" pattern=".+@g.unicamp.br" />
            </div>
            <div className="textbox">
                <FontAwesomeIcon icon={faUser} className="icon" />
                <input type="text" value={apelido} onChange={({ target }) => setApelido(target.value)} name="" placeholder="Apelido" id="" />
            </div>
            <div className="textbox">
                <FontAwesomeIcon icon={faLock} className="icon" />
                <input type="password" value={senha} onChange={({ target }) => setPassword(target.value)} name="" placeholder="Senha" id="senha" />
            </div>
            <input className="botao" type="submit" value="Cadastrar" />
            <br />
            {
                cadastrado ?
                    <div>
                        <FontAwesomeIcon icon={faExclamationTriangle} className="iconErro" />
                        <div className="erro">
                            <h4 className="msgErro">{erro}</h4>
                        </div>
                    </div> :
                    <h4 className="msgErro">{erro}</h4>}
        </form>
        </div>
    )
};
export default connect(state => ({
    saldoDeMonitoria: state.user.saldoDeMonitoria,
    role: state.user.role,
}))(Cadastro);