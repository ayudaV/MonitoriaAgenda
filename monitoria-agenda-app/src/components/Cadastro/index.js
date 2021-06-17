import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faExclamationTriangle, faUser } from '@fortawesome/free-solid-svg-icons';
import Logo from '../../assets/images/monitoriaAgenda.png';


const Cadastro = () => {
    const [email, setUsuario] = useState("");
    const [apelido, setApelido] = useState("");
    const [senha, setPassword] = useState("");
    const [erro, setErro] = useState('');
    const [cadastrado, setCadastro] = useState(false);

    const saldoDeMonitoria = 500;
    const role = 'Aluno';

    const handleSubmit = async e => {
        e.preventDefault();
        if (email.search('@g.unicamp.br') < 0) return setErro(" Digite um email válido!")

        if (apelido.length < 1) return setErro(" Coloque um apelido válido!")

        if (senha.length <= 3) return setErro(" Coloque uma senha com mais de 3 dígitos")

        const userForm = { email, senha, apelido, saldoDeMonitoria, role };

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
                        setCadastro(true);
                    }
                    else {
                        console.log(' E-mail já cadastrado ou servidor off-line.');
                        setErro("E-mail já cadastrado ou servidor off-line.");
                    }
                })
            .catch(function (error) {
                console.log('There has been a problem with your fetch operation: ' + error.message);
            })
    }
    return (
        <div className="container">
            <div className="container-login">
                <img className="logo" src={Logo} alt="Logo Monitoria Agenda" />
                <form onSubmit={handleSubmit}>
                    <h1>Cadastro</h1>
                    <div className="textbox">
                        <FontAwesomeIcon icon={faEnvelope} className="icon" />
                        <input type="email"  autoFocus="autoFocus" value={email} onChange={({ target }) => setUsuario(target.value)} placeholder="E-mail" pattern=".+@g.unicamp.br" />
                    </div>
                    <div className="textbox">
                        <FontAwesomeIcon icon={faUser} className="icon" />
                        <input type="text" value={apelido} onChange={({ target }) => setApelido(target.value)} placeholder="Apelido"/>
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
                                <div className="successful">
                                    <h4 className="msgCadastrado">Cadastro realizado com sucesso!</h4>
                                    <Link to="/">Voltar ao login</Link>
                                </div>
                            </div> : <>
                                {erro ?
                                    <>
                                        <h4 className="msgErro">
                                            < FontAwesomeIcon icon={faExclamationTriangle} className="iconErro" />
                                            {erro}
                                        </h4>
                                    </> : <></>
                                }
                            </>
                    }
                </form>
            </div >
        </div>
    )
};
export default Cadastro;