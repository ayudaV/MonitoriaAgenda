import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faExclamationTriangle, faArrowAltCircleLeft, faSmileBeam } from '@fortawesome/free-solid-svg-icons';

import { connect } from 'react-redux'
import * as LoginActions from '../../store/actions/login'

import Logo from '../../assets/images/monitoriaAgenda.png';

const Account = ({ email, saldoDeMonitoria, role, dispatch }) => {
    const [apelido, setApelido] = useState("");
    const [senha, setPassword] = useState("");
    const [erro, setErro] = useState('');
    const [sucesso, setSucesso] = useState(false);
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
        setSucesso(false)

        if (apelido.length < 1) return setErro(" Coloque um apelido válido!")

        if (senha.length <= 3) return setErro(" Coloque uma senha com mais de 3 dígitos")

        const userForm = { email, senha, apelido, saldoDeMonitoria, role };

        await fetch(`http://localhost:5000/aluno/` + email, {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userForm)
        })
            .then(
                resp => {
                    if (resp.ok) {
                        //console.log(resp.json());
                        resp.json().then((data) => {
                            console.log('data.user.email: ' + data.email);
                            dispatch(LoginActions.setLogin(data))
                            setErro(null)
                            setSucesso(true)
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
    if (role === "Anonymous") {
        return (<Redirect to="/" />)
    }
    return (
        <div className="container">
            <div className="container-login">
                <Link to="/horarios"><FontAwesomeIcon icon={faArrowAltCircleLeft} className="icon-back" /></Link>
                <img className="logo" src={Logo} alt="Logo Monitoria Agenda" />
                <form onSubmit={handleSubmit}>
                    <h1>Alterar Dados</h1>
                    <div className="textbox">
                        <FontAwesomeIcon icon={faEnvelope} className="icon" />
                        <input type="text" value={apelido} onChange={({ target }) => setApelido(target.value)} name="" placeholder="Apelido" />
                    </div>
                    <div className="textbox">
                        <FontAwesomeIcon icon={faLock} className="icon" />
                        <input type="password" value={senha} onChange={({ target }) => setPassword(target.value)} name="" placeholder="Nova Senha" id="senha" />
                    </div>
                    <div className="mostrar">
                        <input type="checkbox" onClick={mostrarSenha} id="mostrar" /> <span className="txt">Mostrar Senha</span>
                        <span className="checkmark"></span>
                    </div>
                    <input className="botao" type="submit" value="Salvar" />
                    {
                        sucesso ?
                            <h4 className="successful">
                                < FontAwesomeIcon icon={faSmileBeam} className="icon" />
                                Alterações realizadas com sucesso!
                            </h4> : <>
                                {erro ?
                                    <h4 className="msgErro">
                                        < FontAwesomeIcon icon={faExclamationTriangle} className="iconErro" />
                                        {erro}
                                    </h4> : <></>
                                }
                            </>
                    }
                </form>
            </div>
        </div>
    )

};
export default connect(state => ({
    email: state.login.user.email,
    saldoDeMonitoria: state.login.user.saldoDeMonitoria,
    role: state.login.user.role,
}))(Account);
